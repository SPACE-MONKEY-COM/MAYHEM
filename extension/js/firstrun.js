let getC = JSON.parse(localStorage.getItem('settings')) || '';

if(getC == null){
    
    localStorage.setItem('settings', JSON.stringify(settingsCookie));
    // chrome.tabs.create({});
    window.close();
}   

chrome.tabs.create({});