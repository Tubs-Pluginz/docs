# Commands Reference 💻

BTGraves provides a primary command, `/grave`, for plugin management and information.

::: tip Permissions
Ensure users have the appropriate [permissions](./permissions.md) to execute these commands.
:::

## `/grave`

*   **Aliases:** None by default.
*   **Base Command:** `/grave`

### Subcommands:

*   #### `/grave info`
    *   **Description:** Displays information about the BTGraves plugin, including its version, author, and links to GitHub and Discord. If `checkVersion` is enabled in the config and the user has `btgraves.admin` permission, it will also indicate if an update is available.
    *   **Permission:** None required by default to see basic info. Update status shown with `btgraves.admin`.
    *   **Usage Example:**
        ```bash
        /grave info
        ```

*   #### `/grave reload`
    *   **Description:** Reloads the `config.yml` file for BTGraves. This allows you to apply changes to settings like `graveTimeout` or `expPercentage` without restarting the entire server.
    *   **Permission:** `btgraves.reload`
    *   **Usage Example:**
        ```bash
        /grave reload
        ```
    *   **Output:** Confirms if the config was reloaded.

*   #### `/grave open <graveId>`
    *   **Description:** Allows an administrator to open the inventory GUI of any active grave using its unique Grave ID.
    *   **Permission:** `btgraves.admin.open`
    *   **Arguments:**
        *   `<graveId>`: (Required) The UUID of the grave you wish to open. This ID is not typically shown to players but might be found in logs or if you implement other ways to list graves.
    *   **Usage Example:**
        ```bash
        /grave open 123e4567-e89b-12d3-a456-426614174000
        ```
    *   **Notes:**
        *   This command can only be executed by a player, as it opens an inventory GUI.
        *   If the grave ID is invalid or the grave has expired and been removed, it will not open.

::: details Missing `list` subcommand?
The help message in some older internal versions might have mentioned `/grave list`. However, based on the provided `GraveCommand.java`, this subcommand is not currently implemented. The available commands are `info`, `reload`, and `open`.
:::
