   <div class="card-container">
    <Card padded>
      <label for="media-sources">Media Source</label>
      <div class="columns margins" style="justify-content: flex-start;">
        <select bind:value={selectedMediaSource} id="media-sources" on:change="{handleMediaSourceChange}">
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
          <Button>
            <Label>Upload</Label>
          </Button>
          <Button on:click={handleReset}>
            <Label>Reset</Label>
          </Button>
        </Actions>
      </form>
    </Card>
    <Snackbar bind:this={snackbar}>
      <Label>{snackBarMessage}</Label>
    </Snackbar>
  </div>

  <script>
    import Card, {
      Content,
      Actions,
    } from '@smui/card';
    import Button, {Label } from '@smui/button';
    import Snackbar from '@smui/snackbar';

    let mediaSources = ['Spotify','Apple'];
    let selectedMediaSource = 'Spotify';

    let mediaJson = '';
    let isParsed = false;
    let hasError = false;
    let tracks = 0;

    let snackbar;
    let snackBarMessage = '';

    if(mediaJson.length > 0) {
      isParsed = true;
    }

    function handleMediaSourceChange()
    {
        if(selectedMediaSource !== 'Spotify'){
            snackBarMessage = selectedMediaSource+' media source is not yes supported';
            snackbar.open();
        }
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
          if(res.ok){
            snackBarMessage = "Upload succeeded";
            snackbar.open();
          }else{
            showError();
          }
        }catch(err){
            showError();
        }
      }else{
        snackBarMessage = 'Please enter you media data';
        snackbar.open();
      }
    }

    function showError()
    {
      hasError = true;
      isParsed = false;
      snackBarMessage = "An error occurred. Please try again."
      snackbar.open();
    }
  </script>