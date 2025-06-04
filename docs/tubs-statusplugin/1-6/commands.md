# Commands Reference 💻

Tub's Status Plugin primarily uses two base commands: `/status` for player-focused status management and `/tsp` (Tub's Status Plugin) for general plugin administration and some admin-specific status actions.

::: tip Permissions
Command access is governed by permissions. Players will only see relevant subcommands they have permission for when using help commands.
:::

## `/status` Command

*   **Aliases:** None by default.
*   **Primary Target:** Players managing their own status, or admins managing specific player statuses.
*   **Note:** This command can only be executed by a player.

### Subcommands for `/status`:

*   #### `/status <message>`
    *   **Description:** Sets your own status to the provided `<message>`.
    *   **Permission:** `StatusPlugin.setStatus`
    *   **Usage Example:** `/status &aOnline and Happy!`
    *   **Notes:**
        *   Use `&_` for spaces if needed (e.g., `/status Hello&_World`).
        *   Color/formatting codes (e.g., `&a`, `&l`) require corresponding `StatusPlugin.formatting.<type>` permissions.
        *   Subject to `maxStatusLength` from `config.yml`.
        *   If `groupMode: true` in `config.yml`, this command is disabled for non-admin players (they must use `/status <groupname>`). Admins with `StatusPlugin.admin.setStatus` can still use this to set their own custom status.

*   #### `/status <groupname>`
    *   **Description:** Sets your status to one of the predefined groups. Only functional if `groupMode: true` is enabled in `config.yml`.
    *   **Permission:** `StatusPlugin.group.set` (and specific group permissions, see [Permissions Guide](./permissions.md)).
    *   **Usage Example:** `/status vip_group`

*   #### `/status remove`
    *   **Description:** Removes your own status.
    *   **Permission:** `StatusPlugin.setStatus`
    *   **Usage:** `/status remove`
    *   **Note:** If `groupMode: true`, this command might not be the primary way to clear a group status (typically you'd switch to another group or an admin would remove it).

*   #### `/status <player> <status|groupname>`
    *   **Description:** (Admin) Sets the status of another `<player>` to the given `<status>` message or `<groupname>`.
    *   **Permission:** `StatusPlugin.admin.setStatus`
    *   **Usage Examples:**
        *   `/status Notch Server_Admin` (sets custom status)
        *   `/status Herobrine admin_group` (sets group status, if `admin_group` is defined)
    *   **Notes:**
        *   This command allows admins to set custom statuses for players even if `groupMode` is on.
        *   If a group name is provided, it will attempt to set that group for the player.

*   #### `/status remove <player>`
    *   **Description:** (Admin) Removes the status of the specified `<player>`.
    *   **Permission:** `StatusPlugin.admin.setStatus`
    *   **Usage Example:** `/status remove Herobrine`

## `/tsp` Command (Tub's Status Plugin)

*   **Aliases:** None by default.
*   **Primary Target:** Plugin administration, global settings, and console-accessible commands.
*   **Note:** Can be executed by players with permission and by the console (unless specified).

### Subcommands for `/tsp`:

*   #### `/tsp help [colorcodes]`
    *   **Description:** Displays help information.
        *   `/tsp help`: Shows available `/tsp` commands for the user.
        *   `/tsp help colorcodes`: Shows a list of Minecraft color and formatting codes.
    *   **Permission:** Implicitly accessible if any other `/tsp` subcommand is.
    *   **Usage Examples:**
        *   `/tsp help`
        *   `/tsp help colorcodes`

*   #### `/tsp info`
    *   **Description:** Displays information about Tub's Status Plugin, including version, author, and support links. May also show update availability if `checkUpdate: true`.
    *   **Permission:** Implicitly accessible.
    *   **Usage:** `/tsp info`

*   #### `/tsp reload`
    *   **Description:** Reloads the plugin's `config.yml` and `statuses.yml` files.
    *   **Permission:** `StatusPlugin.admin.reload`
    *   **Usage:** `/tsp reload`
    *   **Notes:** Can be executed from the console.

*   #### `/tsp setmaxlength <length>`
    *   **Description:** Sets the maximum allowed character length for statuses (ignoring color codes and placeholders).
    *   **Permission:** `StatusPlugin.admin.setMaxlength`
    *   **Arguments:**
        *   `<length>`: (Required) A positive integer.
    *   **Usage Example:** `/tsp setmaxlength 20`
    *   **Notes:** Can be executed from the console.

*   #### `/tsp resetmaxlength`
    *   **Description:** Resets the maximum status length to its default value (as per `config.yml` default, typically 15).
    *   **Permission:** `StatusPlugin.admin.resetMaxlength`
    *   **Usage:** `/tsp resetmaxlength`
    *   **Notes:** Can be executed from the console.

*   #### `/tsp setstatus <player> <status|groupname>`
    *   **Description:** (Admin) Sets the status of `<player>` to the given `<status>` message or `<groupname>`.
    *   **Permission:** `StatusPlugin.admin.setStatus`
    *   **Usage Examples:**
        *   `/tsp setstatus Notch Server_Admin`
        *   `/tsp setstatus Herobrine admin_group`
    *   **Notes:**
        *   This command allows admins to set custom statuses for players even if `groupMode` is on.
        *   If a group name is provided, it will attempt to set that group for the player.
        *   Can be executed from the console.

*   #### `/tsp remove <player>`
    *   **Description:** (Admin) Removes the status of the specified `<player>`.
    *   **Permission:** `StatusPlugin.admin.setStatus`
    *   **Usage Example:** `/tsp remove Herobrine`
    *   **Notes:** Can be executed from the console.