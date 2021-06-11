console.log('yt-script injected.');

document.addEventListener('keydown', function(event){
    console.log(event.target);
    if(event.target.tagName.toLowerCase() == 'input')
        return;
        
    if(event.key == ']')
        nextChapter();
    else if(event.key == '[')
        previousChapter();
});

function getPlayerAndTimes(){
    let markers = document.getElementsByTagName('ytd-macro-markers-list-item-renderer');
    let timestamps = Array.from(markers).map(function(x){
        let time = x.querySelector('#time').innerText;
        let sections = time.split(':');
        let seconds = 0;
        for(let [index, section] of sections.entries())
            seconds += section * Math.pow(60, Math.abs(sections.length - index - 1));
        return seconds;
    });
    let player = document.getElementsByTagName('ytd-player')[0].getPlayer();
    return [timestamps, player];
}

function nextChapter(){
    let timestamps, player;
    [timestamps, player] = getPlayerAndTimes();
    let currentTime = player.getCurrentTime();
    let next = timestamps.find(x => x >= currentTime);
    if(next)
        player.seekTo(next);
}

function previousChapter(){
    let timestamps, player;
    [timestamps, player] = getPlayerAndTimes();
    let currentTime = player.getCurrentTime();
    let next = timestamps.reverse().find(x => x < currentTime -1);
    if(next)
        player.seekTo(next);
}