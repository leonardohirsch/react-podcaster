export const formatDate = (date) => {

    const newDate = new Date(date);

    return newDate.toLocaleDateString();
}

export const hasUpdatedLocalDb = (db) => {

    const localDb = (localStorage.getItem(db)) ? { ...JSON.parse(localStorage.getItem(db))} : null;

    return (localDb && !moreThanOneDay(localDb.savedAt)) ? true : false;
}

export const moreThanOneDay = (date) => {
    const dateToCheck = new Date(date).getTime();
    const oneday = 60 * 60 * 24 * 1000;
    const now = Date.now();
    const oneDayTimeAgo = now - oneday;
    return ( dateToCheck < oneDayTimeAgo ) ? true : false;
}

export const msToMS = ( ms ) => {
    let seconds = ms / 1000;
    const minutes = parseInt( seconds / 60 ); // 60 seconds in 1 minute
    // 4- Keep only seconds not extracted to minutes:
    seconds = seconds % 60;
    return `${minutes}:${seconds}`;
}