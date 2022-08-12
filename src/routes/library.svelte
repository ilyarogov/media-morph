<div>Your media library</div>          
<Button on:click={handleShuffle}>
    <Label>Shuffle</Label>
  </Button>

<div class="card-container">
    <LayoutGrid>
        {#each shuffle(mediaList) as media}
            <Cell>
                <Card padded>
                    <div class="mdc-typography--subtitle1"><strong>{media.name} - {media.artist_name}</strong></div>
                    <a href="https://music.youtube.com/search?q={media.name+' '+media.artist_name}" target="_blank">Youtube Music</a>
                    <a href="https://open.spotify.com/track/{media.uri.split(':')[2]}" target="_blank">Spotify</a>
                    <a href="https://music.apple.com/us/search?term={media.name+' '+media.artist_name}" target="_blank">Apple Music</a>
                    <a href="https://www.youtube.com/results?search_query={media.name+' '+media.artist_name}" target="_blank">Youtube</a>
                </Card>
            </Cell>
        {/each}
    </LayoutGrid>
</div>
<script>
   import Card, {  
      Content,
      PrimaryAction,
      Actions,
      ActionButtons,
      ActionIcons,
    } from '@smui/card';

    import LayoutGrid, { Cell } from '@smui/layout-grid';
    import Button, { Label } from '@smui/button';

    export let mediaList;
    
    function handleShuffle()
    {
        mediaList = shuffle(mediaList);
    }

    function shuffle(array) 
    {
        return array.sort(() => Math.random() - 0.5);
    }
</script>
<script context="module">
    export async function load({fetch}) 
    {
        try{
            const response = await fetch('/media', {method: 'GET'});
            return {
                status: response.status,
                props: {
                    mediaList: response.ok && await response.json()
                }
            };
        }catch(err){
            console.log(err);
        }
    }
</script>