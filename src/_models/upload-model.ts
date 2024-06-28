class UploadModel {
    id: string;
    files: string[];
    accessRule: number | null
    dateRule: Date | null
    
    constructor(files: string[], accessRule: number | null, dateRule: Date | null) {
        this.id = "";
        this.files = files;
        this.accessRule = accessRule;
        this.dateRule = dateRule;

        if (accessRule == null && dateRule == null) {
            let date = new Date();
            date.setHours(date.getHours() + 24)
            this.dateRule = date;
        }
    }
}

export type UploadModelPayload = Omit<UploadModel, "id">