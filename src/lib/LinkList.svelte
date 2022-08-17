<Card padded>
    <div class="mdc-typography--subtitle1"><strong>{showString(media)}</strong></div>
    <a href="https://music.youtube.com/search?q={showString(media)}" target="_blank">Youtube Music</a>
    <a href="https://open.spotify.com/track/{showSpotifyUrl(media)}" target="_blank">Spotify</a>
    <a href="https://music.apple.com/us/search?term={showString(media)}" target="_blank">Apple Music</a>
    <a href="https://www.youtube.com/results?search_query={showString(media)}" target="_blank">Youtube</a>
</Card>
<script>
    import Card  from '@smui/card';
    export let media;
    
    function showString(media){
        return media.artist_name+' - '+media.name;
    }

    function showSpotifyUrl(media){
       return media.uri.split(':')[2];
    }
</script>