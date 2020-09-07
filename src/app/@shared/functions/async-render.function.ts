export function AsyncRender(target: any, method: string, descriptor: PropertyDescriptor): void {
    const originalMethod = descriptor.value;
    descriptor.value = function(...args) {
        return setTimeout(() => originalMethod.apply(this, args), 0);
    };
}
