import {Directive, ElementRef, inject, input} from "@angular/core";

@Directive({
    selector: 'a[appSafeLink]',
    standalone: true,
    host: {
        '(click)': 'onConfirmLeavePage($event)'
    }
})

export class SafeLinkDirective {
    queryParam = input('myapp', {alias: 'appSafeLink'});
    private hostElementRef = inject<ElementRef<HTMLAnchorElement>>(ElementRef);

    constructor() {
        console.log('safe link directive');
    }
    onConfirmLeavePage(event: MouseEvent) {
        const wantToLeave = window.confirm('do you want to leave the app?');
        if (wantToLeave){
            const address = this.hostElementRef.nativeElement.href; // (event.target as HTMLAnchorElement).href;
            // (event.target as HTMLAnchorElement).href = address + '?form=' + this.queryParam();
            this.hostElementRef.nativeElement.href = address + '?form=' + this.queryParam();
            return;
        }
        event.preventDefault();
    }
}
