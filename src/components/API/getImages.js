export const getImages = (name, page) => {
    const params = new URLSearchParams({
        q: name,
        page: page,
        key: '34575125-34d98c7bc370876af411504a6',
        image_type: 'photo',
        orientation: 'horizontal',
        per_page: 12,
    });
    return fetch(`https://pixabay.com/api/?${params}`)
};