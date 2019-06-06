export interface GlobalState {
    items: any[];
    name: string;
    status?: boolean;

    hideViewTabs?: boolean;
    pageNotification: PageNotification
}

export interface PageNotification {
    icon?: string;
    status?: boolean;
    displayType?: NotificationDisplayType;
    msg: string,
    show: boolean
}

export enum NotificationDisplayType {
    Inline,
    Block
}