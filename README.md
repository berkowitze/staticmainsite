## File watching

```sh
fswatch -0 templates | xargs -0 -n 1 -I {} python3 build.py
```

Alias example: `watch-main`
