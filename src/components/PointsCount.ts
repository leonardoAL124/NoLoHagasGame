export let acum: number = 0;

export const setAcum = () => {
    acum = 0;
};

export const storagePoints = (num: number) => {
    acum += num;
    return acum;
};