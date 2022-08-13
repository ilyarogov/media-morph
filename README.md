# Media Morph

This is a SvelteKit-based web application that's meant to be locally hosted. Although I am planning on hosting it myself once I figure out which adapter to use.

## Motivation

I decided to unsubscribe from Spotify Premium and use YouTube Music instead. However, there's no easy way to import your library from one service to another. Spotify does provide an API but YouTube Music does not.

Luckily Spotify lets you export your data including your playlists via a zip archive that contains several JSON files. https://www.spotify.com/account/privacy/ These are easy to parse and you can extract the artists and songs from them.

This app lets you take this JSON file and create a database containing all the artist and songs on your playlists and then display then in as a list with links to other music/media services. So far I include Spotify, YouTube Music, YouTube and Apple Music.
