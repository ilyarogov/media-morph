   <div class="card-container">
    <Card padded>
      <label for="media-sources">Media Source</label>
      <div class="columns margins" style="justify-content: flex-start;">
        <select value={selectedMediaSource} id="media-sources">
          {#each mediaSources as source}
            <option value={source}>{source}</option>
          {/each}
        </select>
      </div>
      <Content>Paste JSON file containing media</Content>
      <form method="post" action="/upload" on:submit|preventDefault={handleUpload}>
        <textarea cols="80" rows="30" bind:value={mediaJson} on:change={updateMediaJson}></textarea>
        {#if isParsed}
          <Content class="mdc-typography--body2">
            Tracks {tracks}
          </Content>
        {/if}
        {#if hasError}
          <div>JSON is invalid</div>
        {/if}
        <Actions>
          {#if isParsed}
            <Button>
              <Label>Upload</Label>
            </Button>
          {/if}
          <Button on:click={handleReset}>
            <Label>Reset</Label>
          </Button>
        </Actions>
      </form>
    </Card>
  </div>

  <script>
    import Card, {
      Content,
      PrimaryAction,
      Actions,
      ActionButtons,
      ActionIcons,
    } from '@smui/card';
    import Button, { Label } from '@smui/button';

    let mediaSources = ['Spotify'];
    let selectedMediaSource = 'Spotify';

    let mediaJson = '';
    let isParsed = false;
    let hasError = false;
    let tracks = 0;

    if(mediaJson.length > 0) {
      isParsed = true;
    }

    function updateMediaJson()
    {
      try {  
        const json = JSON.parse(mediaJson);
        tracks = json.tracks.length;
        isParsed = true;
        hasError = false;
      } catch (e) {  
        hasError = true;
        isParsed = false;
      }

    }

    function handleReset()
    {
      mediaJson = '';
      hasError = false;
      isParsed = false;
    }

    async function handleUpload()
    {
      if(isParsed && !hasError){
        try{
          const res = await fetch('/upload', {
            method: 'POST',
            body: mediaJson
          });
        }catch(err){
          hasError = true;
          isParsed = false;
        }
      }
    }
  </script>