# blog-vercel
Practice for vercel deployment

### How to develop
1. `npm install`
2. `npm run dev`

### How to upload music
1. Add music to `my-next-app/public/music-player/music` directory.
2. `sh music-manager.sh`

### Exceptions
> Error: *Listen EACCES: permission denied 00 00 Windows*
> 1. Open PowerShell as Admin.
> 2. `net stop winnat`
> 3. `net start winnat`
