const addLibrary = (urlOfTheLibrary: string) : void => {
    const script = document.createElement('script');
    script.src = urlOfTheLibrary;
    script.async = true;
    document.body.appendChild(script);
}

export {
    addLibrary
}