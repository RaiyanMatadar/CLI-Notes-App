Here's a practical task that forces you to touch every major `fs` operation — a **CLI Notes App**.

## Task: Build `notes-cli.js`

A command-line notes manager that stores notes as a JSON file (`notes.json`) on disk. No database, no npm packages except maybe `chalk` for color if you want — pure `fs` + `path`.

### Requirements

1. **Add a note**
   ```
   node notes-cli.js add "Buy groceries"
   ```
   - If `notes.json` doesn't exist yet, create it (`writeFile`)
   - If it exists, read it, parse the JSON, push the new note, write it back
   - Each note should have an `id`, `text`, and `createdAt`

2. **List all notes**
   ```
   node notes-cli.js list
   ```
   - Read `notes.json`, print each note nicely

3. **Remove a note by id**
   ```
   node notes-cli.js remove 2
   ```
   - Read, filter out the note, write back

4. **Archive notes**
   ```
   node notes-cli.js archive
   ```
   - Move all notes into an `archive/` folder as individual `.txt` files (one file per note, filename = note id)
   - This forces you to use `mkdir` (with `recursive: true` in case the folder doesn't exist) and `writeFile` in a loop

5. **Check note count without opening the file**
   ```
   node notes-cli.js stats
   ```
   - Use `stat` to print file size of `notes.json` and last modified date
   - Use `existsSync` to handle the case where no notes exist yet gracefully

6. **Clear everything**
   ```
   node notes-cli.js clear
   ```
   - Delete `notes.json` with `unlink`
   - Delete the `archive/` folder with `rm({ recursive: true })`

### Constraints (this is the actual learning part)

- Use `fs/promises` + `async/await` everywhere — no callbacks, no `*Sync`
- Wrap every file operation in `try/catch` and handle the "file doesn't exist yet" case gracefully instead of crashing
- Use `path.join(__dirname, ...)` for every path — never a bare relative string
- Read `process.argv` yourself to parse the command and arguments (good side-practice, not fs-related but you'll need it)

### Stretch goal
Add `edit <id> <new text>` — this one's slightly trickier because there's no direct "edit line in JSON" method, you have to read → modify the array → write the whole thing back. That's a pattern you'll use constantly with JSON-file-as-database setups.

---

Want me to give you a starter skeleton (just the `process.argv` parsing and function stubs, no fs logic filled in) so you write the fs parts yourself, or do you want to just build it from scratch and come back if you get stuck?