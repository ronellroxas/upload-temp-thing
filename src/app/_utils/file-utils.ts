export const FileUtils = {
    // TODO: PREMIUM FOR SIZES?
    getMaxSize: () : number => {
        return 5e+6;
    },

    formatBytesToDisplay: (bytes: number) => {
        return (bytes / (1024*1024)).toFixed(2);
    }
}