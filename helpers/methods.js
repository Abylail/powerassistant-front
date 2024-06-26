const today = new Date();
export const daysLeft = (future) => {
    const futureFate = new Date(future);
    let difference = futureFate.getTime() - today.getTime();

    return Math.ceil(difference / (1000 * 3600 * 24));
}

export const getImageUrl = url => {
    const config = useRuntimeConfig();
    return config.public.CDN_URL + url;
}