import gitlab
import os, re, logging
from jinja2 import Template, Environment, FileSystemLoader
from datetime import datetime

RELEASE_NOTES="release_notes_{}".format(datetime.now().strftime('%Y-%m-%d_%H_%M_%S'))

logging.basicConfig(format='%(levelname)s: %(message)s', level=logging.DEBUG)

HOST = "gitlab.funcoff.club"
#PROJECT_ID = os.environ.get('CI_PROJECT_ID')
PROJECT_ID = 55
# MILESTONE_TITLE = 'Release_23.12.2019-27.12.2019'
# logging.warning("Milestone: {}".format(MILESTONE_TITLE))
MILESTONE_TITLE = os.environ.get("MILESTONE")
MILESTONE_TITLE = "ver. 1.0"
#logging.warning("Milestone: {}".format(MILESTONE_TITLE))

#JINJA PRECONFIG
FILE_LOADER = FileSystemLoader('templates')
env = Environment(loader=FILE_LOADER)
TEMPLATE = env.get_template("./release_notes.j2")

gl = gitlab.Gitlab.from_config(HOST, ['./python-gitlab.cfg'])
#gl = gitlab.Gitlab.from_config(HOST, ['./gl.cfg'])

# use M_ID for getting only last milestone without specifing name
M_ID = ""

def save_output(output):
    with open("./output/{}.md".format(RELEASE_NOTES), 'w') as out:
        out.write(output)

def render_template(milestone, closed_issues):
    logging.info("Going to render milestone: {}".format(milestone.attributes['title']))
    output = TEMPLATE.render(milestone=milestone, closed_issues=closed_issues)
    print(output)
    return(output)

def milestone_id_by_name(gl):
    #milestones = gl.milestones.list(search=MILESTONE_TITLE)
    milestones = gl.milestones.list(state='active')
    logging.info("milestones got: {}".format(milestones))
    if not milestones:
        logging.warning("milestone wasn't find! Exit 1")
        exit(1)
    m_id = milestones[-1].attributes['id']
    return(m_id)

def get_milestone_project():
    project = gl.projects.get(PROJECT_ID)
    m_id  = milestone_id_by_name()
    logging.info("Milestone ID: {}".format(m_id))
    milestone = project.milestones.get(m_id)
    return(milestone)

def get_milestone_group():
    global M_ID

    group = gl.groups.get(PROJECT_ID)
    M_ID  = milestone_id_by_name(group)
    logging.info("Milestone ID: {}".format(M_ID))
    milestone = group.milestones.get(M_ID)
    logging.info(milestone)
    return(milestone)


def get_issues(state_status, gl):
    global M_ID

    g_milestone = gl.milestones.get(M_ID)
    issues = [issue for issue in g_milestone.issues() if issue.state == state_status]
    return(issues)

def gl_init():
    global gl, M_ID

    gl.auth()
    milestone = get_milestone_group()
    group = gl.groups.get(PROJECT_ID)
    closed_issues = get_issues('closed', group)
    print(len(closed_issues))

    output = render_template(milestone, closed_issues)

    save_output(output)
    #issues_call()
    logging.info("Successfully finished script. Exit (0)")

if __name__ == "__main__":
    logging.info("Starting Gitlab to Release note script...")
    gl_init()

