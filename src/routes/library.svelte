<div>Your media library</div>
{#each mediaList as media}
    <div>{media.name}</div>
{/each}
<script>
    export let mediaList;
</script>
<script context="module">
    import Card, {
      Content,
      PrimaryAction,
      Actions,
      ActionButtons,
      ActionIcons,
    } from '@smui/card';

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