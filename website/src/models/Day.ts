// Enums i typescript ger alltid både keys och values när man loopar med Object.keys(enum).
// Arrayen med keys eller values blir dubbelt så lång som den borde vara.
// https://stackoverflow.com/questions/49124655/enum-type-gives-double-array-in-typescript
enum DayEnum{ Måndag, Tisdag, Onsdag, Torsdag, Fredag, Lördag, Söndag }
export const Day = fixStupidTypescriptEnum(DayEnum);
function fixStupidTypescriptEnum(tsEnum: any){
    let fixedEnum = Object.entries(tsEnum);
    const realLength = fixedEnum.length / 2;
    fixedEnum = fixedEnum.slice(0, realLength);
    return fixedEnum;
}