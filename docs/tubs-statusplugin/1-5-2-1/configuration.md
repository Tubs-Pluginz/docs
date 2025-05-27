# Configuration Guide ⚙️

Tub's Status Plugin is configured via the `config.yml` file, located in `plugins/TubsStatusPlugin/`. This file is generated with default values on the plugin's first load.

::: tip Backup First!
Before making extensive changes, consider backing up your `config.yml`.
:::

Here's a detailed breakdown of each option:

---

### `fileversion`
*   **Description:** Internal version number for the configuration file, used by the plugin for managing automatic config updates.
*   **Action:** **Do not change this value manually.**
*   **Default:** (e.g., `4`)

---

### `checkUpdate`
*   **Description:** If `true`, the plugin will check Modrinth for new versions of Tub's Status Plugin on server startup. Notifications appear in the console and to admins on join for important updates.
*   **Type:** `Boolean`
*   **Default:** `true`

---

### `maxStatusLength`
*   **Description:** The maximum number of displayable characters allowed in a player's status. Color codes (`&c`, `&l`, etc.) and PlaceholderAPI placeholders are **not** counted towards this limit.
*   **Type:** `Integer`
*   **Default:** `15`
*   **Admin Commands:** Can be changed live with `/status setmaxlength <length>` and reset with `/status resetmaxlength`.

---

### `chatFormatter`
*   **Description:** If `true`, the plugin will format player chat messages to include their status before their name (e.g., `[Status] PlayerName: message`). It also processes color codes in the main chat message if the player has permission.
*   **Type:** `Boolean`
*   **Default:** `true`

---

### `changeTablistNames`
*   **Description:** If `true`, the plugin will modify player names in the tab list to include their status.
    ::: warning Requires Restart/Relog
    Changes to this setting, or status changes themselves, might require players to relog or the server to restart for the tab list to fully update for all players due to how Minecraft handles tab list packets. The plugin attempts to update tab names periodically (every 30 seconds by default).
    :::
*   **Type:** `Boolean`
*   **Default:** `true`

---

### `groupMode`
*   **Description:** If `true`, players will not be able to set a fully custom status with `/status <message>`. Instead, they must choose a status from predefined groups using the `/group <groupname>` command (or `/status group <groupname>`). Admins with `StatusPlugin.admin.setStatus` can still set custom statuses for others.
*   **Type:** `Boolean`
*   **Default:** `false`

---

### `statusGroups`
*   **Description:** Defines a list of predefined status groups that players can select if `groupMode` is `true`. Each entry is a group key, and under it, a `status` string.
*   **Type:** `Map`
*   **Structure:**
    ```yaml
    statusGroups:
      groupKey1:
        status: "The actual status message for group1"
      anotherGroup:
        status: "&cTeam Red"
    ```
*   **Default:**
    ```yaml
    statusGroups:
      t1:
        status: 'Team1'
      t2:
        status: 'Team2'
      t3:
        status: 'Team3'
    ```
*   **Permissions:** To use a specific group, players need `StatusPlugin.group.set.<groupKey>` (e.g., `StatusPlugin.group.set.t1`). The base `StatusPlugin.group.set` permission (default: true) allows use of the `/group` command itself.

---

### `openingCharacter`
*   **Description:** The character(s) to display *before* the player's status in chat and tab list (if enabled).
*   **Type:** `String`
*   **Default:** `[`

---

### `closingCharacter`
*   **Description:** The character(s) to display *after* the player's status in chat and tab list (if enabled).
*   **Type:** `String`
*   **Default:** `]`

---

::: details Example `config.yml` (fileversion: 4)
```yaml
################################
#      Tub's StatusPlugin      #
#          by TubYoub          #
################################
# Don't change this value, it's changed by the plugin if needed
fileversion: 4

# Check for updates on startup
# default: true
checkUpdate: true
# maximum Character length a Status should be allowed to have.
# default: 15
maxStatusLength: 15
# If the Chat formatter should be enabled (so the Plugin sends Messages with the Status in front of the Player name and formats colors).
# default: true
chatFormatter: true
# If the Tablist name should be changed by the plugin or not. (restart your server so the changes will work correctly)
# default: true
changeTablistNames: true
# Enable group mode for statuses
# When enabled, players can only choose from predefined status groups
# default: false
groupMode: false
# Define status groups
# Each group has a name and a status
statusGroups:
  t1:
    status: 'Team1'
  t2:
    status: 'Team2'
  t3:
    status: 'Team3'

# Opening and closing characters for the status
# default: '[' & ']'
openingCharacter: '['
closingCharacter: ']'
```
:::

### Status Data (`statuses.yml`)
Player statuses are stored in `plugins/TubsStatusPlugin/statuses.yml`. This file is managed by the plugin and generally should not be edited manually. It stores player UUIDs mapped to their set status string (with raw `&` codes).
