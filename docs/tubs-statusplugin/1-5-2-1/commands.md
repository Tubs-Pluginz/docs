# Commands Reference 💻

Tub's Status Plugin uses the base command `/status`. The `/group` command is also available when `groupMode` is enabled.

::: tip Permissions
Command access is governed by permissions. Players will only see commands they have permission for when using `/status help`.
:::

## `/status` Command

*   **Aliases:** None by default.

### Subcommands for `/status`:

*   #### `/status <message>`
    *   **Description:** Sets your own status to the provided `<message>`.
    *   **Permission:** `StatusPlugin.setStatus` (Default: `true`)
    *   **Usage Example:** `/status &aOnline and Happy!`
    *   **Notes:**
        *   Use `&_` for spaces if needed (e.g., `/status Hello&_World`).
        *   Color/formatting codes (e.g., `&a`, `&l`) require corresponding `StatusPlugin.formatting.<type>` permissions.
        *   Subject to `maxStatusLength` from `config.yml`.
        *   Disabled if `groupMode: true` in `config.yml` (use `/group` instead).

*   #### `/status <player> <message>`
    *   **Description:** Sets the status of another `<player>` to `<message>`.
    *   **Permission:** `StatusPlugin.admin.setStatus` (Default: `op`)
    *   **Usage Example:** `/status Notch Server Admin`

*   #### `/status remove [player]`
    *   **Description:** Removes a status.
    *   **Permission:**
        *   To remove your own status (`/status remove`): `StatusPlugin.setStatus` (Default: `true`)
        *   To remove another player's status (`/status remove <player>`): `StatusPlugin.admin.setStatus` (Default: `op`)
    *   **Usage Examples:**
        *   `/status remove` (removes your own status)
        *   `/status remove Herobrine` (removes Herobrine's status)

*   #### `/status reload`
    *   **Description:** Reloads the plugin's `config.yml` and `statuses.yml` files.
    *   **Permission:** `StatusPlugin.admin.reload` (Default: `op`)
    *   **Usage:** `/status reload`
    *   **Notes:** Can be executed from the console.

*   #### `/status help [colors|colorcodes]`
    *   **Description:** Displays help information.
        *   `/status help`: Shows available commands for the user.
        *   `/status help colors` or `/status help colorcodes`: Shows a list of Minecraft color and formatting codes.
    *   **Permission:** None explicitly defined for `/status help` itself (implicitly accessible if any other `/status` subcommand is). Access to see all commands in help depends on individual permissions.
    *   **Usage Examples:**
        *   `/status help`
        *   `/status help colors`

*   #### `/status setmaxlength <length>`
    *   **Description:** Sets the maximum allowed character length for statuses (ignoring color codes and placeholders).
    *   **Permission:** `StatusPlugin.admin.setMaxlength` (Default: `op`)
    *   **Arguments:**
        *   `<length>`: (Required) A positive integer.
    *   **Usage Example:** `/status setmaxlength 20`

*   #### `/status resetmaxlength`
    *   **Description:** Resets the maximum status length to its default value (15).
    *   **Permission:** `StatusPlugin.admin.resetMaxlength` (Default: `op`)
    *   **Usage:** `/status resetmaxlength`

*   #### `/status info`
    *   **Description:** Displays information about the Tub's Status Plugin, including version, author, and support links. May also show update availability if `checkUpdate: true`.
    *   **Permission:** None explicitly defined (implicitly accessible).
    *   **Usage:** `/status info`

*   #### `/status group <groupname>`
    *   **Description:** Sets your status to one of the predefined groups if `groupMode: true` is enabled in `config.yml`.
    *   **Permission:** `StatusPlugin.group.set` (Default: `true`) and `StatusPlugin.group.set.<groupname>` for the specific group.
    *   **Usage Example:** `/status group afk`
    *   **Note:** This is an alternative to `/group <groupname>`.

## `/group` Command

*   **Aliases:** None by default.
*   **Description:** Sets your status to one of the predefined groups. Only functional if `groupMode: true` is enabled in `config.yml`.
*   **Permission:** `StatusPlugin.group.set` (Default: `true`) and `StatusPlugin.group.set.<groupname>` for the specific group.
*   **Usage:** `/group <groupname>`
    *   `<groupname>`: (Required) The key of a group defined in the `statusGroups` section of `config.yml`.
*   **Example:** `/group t1` (if `t1` is a defined group)
