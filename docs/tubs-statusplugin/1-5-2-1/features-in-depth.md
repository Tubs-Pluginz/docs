# Features In-Depth 🔎

This page details some of the core functionalities of Tub's Status Plugin.

## 1. Setting and Displaying Statuses

*   **Player Command:** Players use `/status <your message>` to set their status.
*   **Admin Command:** Admins can use `/status <player> <message>` to set another player's status.
*   **Formatting:**
    *   Players can use standard Minecraft color codes (e.g., `&c` for red, `&l` for bold) in their status messages if they have the corresponding `StatusPlugin.formatting.<type>` permissions.
    *   The plugin uses a `ColourUtils` helper to translate these `&` codes into actual display colors.
    *   Spaces can be included by typing `&_` where a space is desired, as normal spaces might be trimmed by command argument parsing.
*   **Length Limit:** The `maxStatusLength` in `config.yml` defines the maximum number of *displayable* characters. Color codes and PlaceholderAPI placeholders do not count towards this limit.
*   **Display Locations:**
    *   **Tab List:** If `changeTablistNames: true`, the status appears before the player's name in the tab list (e.g., `[Status] PlayerName`).
    *   **Above Head:** The status is also displayed as part of the player's display name, visible above their head in-game.
    *   **Chat:** If `chatFormatter: true`, chat messages are prefixed with the player's status (e.g., `[Status] PlayerName: Hello!`).
*   **Formatting Characters:** The `openingCharacter` and `closingCharacter` from `config.yml` (default `[` and `]`) are used to wrap the status text.

## 2. Group Mode

*   **Activation:** Set `groupMode: true` in `config.yml`.
*   **Functionality:** When enabled, players cannot set arbitrary custom statuses with `/status <message>`. Instead, they must choose from a list of predefined groups using `/group <groupname>` (or `/status group <groupname>`).
*   **Defining Groups:** Status groups are defined in `config.yml` under the `statusGroups` section:
    ```yaml
    statusGroups:
      afk:
        status: "&eAFK"
      pvping:
        status: "&cIn Combat!"
      trusted: # Example group key
        status: "&aTrusted Member"
    ```
*   **Permissions for Groups:** To use a specific group, a player needs the permission `StatusPlugin.group.set.<groupKey>`. For example, to use the `afk` group above, they'd need `StatusPlugin.group.set.afk`. The base permission `StatusPlugin.group.set` (default: true) allows usage of the `/group` command itself.
*   **Admin Override:** Administrators with `StatusPlugin.admin.setStatus` can still set custom statuses for players even when group mode is active.

## 3. PlaceholderAPI Integration

*   **Detection:** The plugin automatically detects if PlaceholderAPI (PAPI) is installed on the server.
*   **Registration:** If PAPI is found, Tub's Status Plugin registers its own expansion: `tubsstatusplugin`.
*   **Provided Placeholders:**
    *   `%tubsstatusplugin_status%`: Displays the status of the player viewing the placeholder.
    *   `%tubsstatusplugin_status_<playerName>%`: Displays the status of the specified `<playerName>`. Replace `<playerName>` with an actual online player's name.
        *   Example: `%tubsstatusplugin_status_Notch%`
*   **Usage in Statuses:** If PAPI is present and a player has the `StatusPlugin.placeholders` permission, they can use *other* PAPI placeholders *within their own status message*. These placeholders will be parsed and updated.
    *   Example status: `/status Playing on %server_name%`
*   **Automatic Refresh:** The plugin periodically (every 30 seconds by default) updates player display names in the tab list, which helps refresh any PAPI placeholders used within statuses.

## 4. LuckPerms Integration

*   **Detection:** The plugin checks if LuckPerms is installed.
*   **Functionality:** If LuckPerms is present and a player has the `StatusPlugin.placeholders` permission (this permission seems to gate both PAPI and LP placeholder usage in statuses based on `StatusManager.updateDisplayName`), the plugin can incorporate the player's LuckPerms prefix and suffix into their displayed status.
*   **Placeholders for Statuses:** Players can use these specific strings in their status message:
    *   `%LP_prefix%`: Will be replaced by the player's LuckPerms prefix.
    *   `%LP_suffix%`: Will be replaced by the player's LuckPerms suffix.
*   **Example Status:** `/status %LP_prefix% &7MyRole &f%LP_suffix%`
*   **Note:** The actual prefix/suffix content is managed by LuckPerms. This plugin simply provides a way to display them as part of the status.

## 5. Status Persistence

*   **Storage:** Player statuses are saved in the `plugins/TubsStatusPlugin/statuses.yml` file.
*   **Format:** The file stores player UUIDs mapped to their raw status string (including `&` color codes).
*   **Saving:** Statuses are saved whenever a player sets or removes their status.
*   **Loading:** When the plugin enables (server start/reload), it loads all statuses from this file, ensuring players retain their status across sessions.
*   **Reloading:** The `/status reload` command reloads both `config.yml` and `statuses.yml`.

## 6. Update Checking

*   If `checkUpdate: true` in `config.yml`, the plugin contacts the Modrinth API on server startup to check for new versions.
*   Notifications are logged to the console.
*   For updates marked as `CRITICAL` or `HIGH` urgency by the developer on Modrinth, players with the `StatusPlugin.admin` permission (this seems to be the intended permission from `PlayerJoinListener.java`, though not explicitly in `plugin.yml` for this purpose) will receive an in-game notification upon joining.
