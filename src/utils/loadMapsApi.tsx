let googleMapsScript: HTMLScriptElement;

export const loadMapsApi = (): HTMLScriptElement => {
    if(googleMapsScript === undefined) {
        googleMapsScript = document.createElement("script");
        googleMapsScript.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAzggtnE8JZ6NZ4P4HTlMLEkSvp1Bw3vUw";
        googleMapsScript.async = true;
        googleMapsScript.defer = true;

        window.document.body.appendChild(googleMapsScript);
    }

    return googleMapsScript;
}