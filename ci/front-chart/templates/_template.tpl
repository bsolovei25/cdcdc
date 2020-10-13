{{- define "fullname" -}}
{{- if .Values.fullnameOverride -}}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" -}}
{{- else -}}
{{- printf "%s" .Chart.Name | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- end -}}
{{- define "namespace" -}}
  {{- .Release.Namespace -}}
{{- end -}}

{{- define "nodeSelector" -}}
      {{- range $key, $value := .Values.deployment.nodelabels }}
{{ $key }}: {{ $value }}
      {{- end }}
{{- end -}}

{{- define "image" -}}
  {{- $imageRegistry := .Values.microservice.image.dockerhubUrl -}}
  {{- $imageRepo := .Values.microservice.image.imageRepo -}}
  {{- $imageTag := .Values.microservice.image.imageTag -}}
  {{- $imageRegistry -}}/{{- $imageRepo -}}:{{- $imageTag -}}
{{- end -}}
