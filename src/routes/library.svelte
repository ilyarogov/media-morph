{#if mediaList.length === 0}
    <h5 class="center">Your media library is empty</h5>
{:else}
    <div class="center">
        <Button on:click={handleShuffle}><Label>Shuffle</Label></Button>
        <Button on:click={() => (open = true)}><Label>Delete Library</Label></Button>
    </div>  
    <Dialog bind:open>
        <!-- Title cannot contain leading whitespace due to mdc-typography-baseline-top() -->
        <Title id="simple-title">Delete Media Library</Title>
        <Content id="simple-content">Are you sure you want to delete your entire library?</Content>
        <Actions>
          <Button on:click={() => (open = false)}>
            <Label>No</Label>
          </Button>
          <Button on:click$stopPropagation={handleLibraryDelete()}>
            <Label>Yes</Label>
          </Button>
        </Actions>
      </Dialog>
{/if}
<div class="card-container">
    <LayoutGrid>
        {#each shuffle(mediaList) as media}
            <Cell>
                <LinkList media={media}/>
            </Cell>
        {/each}
    </LayoutGrid>
</div>
<script>
    import LayoutGrid, { Cell } from '@smui/layout-grid';
    import Button, { Label } from '@smui/button';
    import Dialog, { Title, Content, Actions } from '@smui/dialog';
    import LinkList from '$lib/LinkList.svelte';

    export let mediaList;

    let open = false;

    function handleShuffle()
    {
        mediaList = shuffle(mediaList);
    }

    function handleLibraryDelete(event)
    {
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
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 500);
            const response = await fetch('/media', {method: 'GET', signal: controller.signal});
            clearTimeout(timeoutId);
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