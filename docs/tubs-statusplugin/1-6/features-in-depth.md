# Features In-Depth 🔎

This page details some of the core functionalities of Tub's Status Plugin.

## 1. Setting and Displaying Statuses

*   **Player Commands:**
    *   `/status <your message>`: Sets a custom status (if `groupMode` is off, or if player is admin).
    *   `/status <groupname>`: Sets a predefined group status (if `groupMode` is on).
    *   `/status remove`: Removes the player's current status.
*   **Admin Commands:**
    *   `/status <player> <message|groupname>` or `/tsp setstatus <player> <message|groupname>`: Sets another player's status (custom or group).
    *   `/status remove <player>` or `/tsp remove <player>`: Removes another player's status.
*   **Formatting:**
    *   Players can use standard Minecraft color codes (e.g., `&c` for red, `&l` for bold) in their status messages if they have the corresponding `StatusPlugin.formatting.<type>` permissions.
    *   The plugin uses `StatusManager.translateColorsAndFormatting` to process these codes and check permissions.
    *   Spaces can be included by typing `&_` where a space is desired.
*   **Length Limit:** The `maxStatusLength` in `config.yml` defines the maximum number of *displayable* characters. Color codes and PlaceholderAPI placeholders do not count towards this limit. Can be changed live by admins using `/tsp setmaxlength` and `/tsp resetmaxlength`.
*   **Display Locations:**
    *   **Tab List:** If `changeTablistNames: true` in `config.yml`, the status appears before the player's name.
    *   **Chat:** If `chatFormatter: true` in `config.yml`, chat messages are prefixed with the player's status.
*   **Formatting Characters:** The `openingCharacter` and `closingCharacter` from `config.yml` (default `[` and `]`) are used to wrap the status text.

## 2. Group Mode

*   **Activation:** Set `groupMode: true` in `config.yml`.
*   **Functionality:** When enabled, non-admin players cannot set arbitrary custom statuses with `/status <message>`. Instead, they must choose from a list of predefined groups using `/status <groupname>`.
*   **Defining Groups:** Status groups are defined in `config.yml` under the `statusGroups` section. Each group has a `status` string and an optional `permissions` list.
    ```yaml
    statusGroups:
      afk:
        status: "&eAFK"
        permissions: ['my.server.afkaccess'] # Player needs 'my.server.afkaccess'
      newbie:
        status: "&aNew Player"
        # No 'permissions' list: access controlled by 'StatusPlugin.group.set'
    ```
*   **Permissions for Groups:**
    1.  A player needs the base `StatusPlugin.group.set` permission to use the `/status <groupname>` command.
    2.  For a specific group:
        *   If the group has a non-empty `permissions` list in `config.yml`, the player needs **one** of those permissions.
        *   If the group's `permissions` list is empty or absent, `StatusPlugin.group.set` is sufficient.
*   **Admin Override:** Administrators with `StatusPlugin.admin.setStatus` can set any custom or group status for any player, bypassing group mode restrictions and target player permission checks for groups.

## 3. PlaceholderAPI Integration

*   **Detection:** The plugin automatically detects if PlaceholderAPI (PAPI) is installed.
*   **Registration:** If PAPI is found, Tub's Status Plugin registers its own expansion: `tubsstatusplugin`.
*   **Provided Placeholders (for use in other plugins):**
    *   `%tubsstatusplugin_status%`: Displays the status of the player viewing the placeholder.
    *   `%tubsstatusplugin_status_<playerName>%`: Displays the status of the specified `<playerName>`.
*   **Usage of External Placeholders in Statuses:** If PAPI is present and a player has the `StatusPlugin.placeholders` permission, they can use *other* PAPI placeholders *within their own status message*.
    *   Example status: `/status Playing on %server_name%`
*   **Automatic Refresh:** The plugin periodically (every 30 seconds by default if `changeTablistNames: true`) updates player display names in the tab list, which helps refresh any PAPI placeholders used within statuses.

## 4. LuckPerms Integration

*   **Detection:** The plugin checks if LuckPerms is installed.
*   **Functionality:** If LuckPerms is present and a player has the `StatusPlugin.placeholders` permission, the plugin can incorporate the player's LuckPerms prefix and suffix into their displayed status.
*   **Placeholders for Statuses (specific to this plugin):**
    *   `%LP_prefix%`: Will be replaced by the player's LuckPerms prefix.
    *   `%LP_suffix%`: Will be replaced by the player's LuckPerms suffix.
*   **Example Status:** `/status %LP_prefix%&7MyRole&f%LP_suffix%`

## 5. Status Persistence

*   **Storage:** Player statuses are saved in the `plugins/TubsStatusPlugin/statuses.yml` file.
*   **Format:** The file stores player UUIDs mapped to their raw status string (including `&` color codes).
*   **Saving:** Statuses are saved whenever a player sets or removes their status, and on plugin disable.
*   **Loading:** When the plugin enables, it loads all statuses from this file.
*   **Reloading:** The `/tsp reload` command reloads both `config.yml` and `statuses.yml`.

## 6. Update Checking

*   If `checkUpdate: true` in `config.yml`, the plugin contacts the Modrinth API on server startup to check for new versions.
*   Notifications are logged to the console.
*   For updates marked as `CRITICAL` or `HIGH` urgency, players with the `StatusPlugin.admin` permission will receive an in-game notification upon joining.

## 7. Configurable Logging

*   The `loggerLevel` in `config.yml` allows administrators to control the amount of detail the plugin logs to the console, ranging from `DEBUG` (10) for detailed troubleshooting to `ERROR` (40) for only critical issues.