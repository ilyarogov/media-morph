<div>Your media library</div>
<div class="card-container">
    <LayoutGrid>
    {#each mediaList as media}
        <Cell>
            <Card>
                <div>{media.name} - {media.artist_name}</div>
                <a href="https://music.youtube.com/search?q={media.name+' '+media.artist_name}" target="_blank">Youtube Music</a>
                <a href="https://open.spotify.com/track/{media.uri.split(':')[2]}" target="_blank">Spotify</a>
                <a href="https://music.apple.com/us/search?term={media.name+' '+media.artist_name}">Apple Music</a>
                <a href="https://www.youtube.com/results?search_query={media.name+' '+media.artist_name}">Youtube</a>
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
    export let mediaList;
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