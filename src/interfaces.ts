declare module essex.visuals.gantt.interfaces {
    export interface Category {
        id: number;
        name: string;
    }

    export interface CategoryData {
        category: number;
        date: string;
        value: number;
    }

    export interface GanttData {
        categories: Category[];
        timeSeries: CategoryData[];
    }
}