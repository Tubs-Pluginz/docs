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
*   **Default:** (e.g., `5`)

---

### `checkUpdate`
*   **Description:** If `true`, the plugin will check Modrinth for new versions of Tub's Status Plugin on server startup. Notifications appear in the console and to admins (with `StatusPlugin.admin` permission) on join for important updates.
*   **Type:** `Boolean`
*   **Default:** `true`

---

### `loggerLevel`
*   **Description:** Controls the verbosity of plugin messages sent to the server console.
*   **Type:** `Integer`
*   **Values:**
    *   `10`: DEBUG (Very detailed, for troubleshooting)
    *   `20`: INFO (Standard operational messages)
    *   `30`: WARN (Warnings about potential issues)
    *   `40`: ERROR (Critical errors)
*   **Default:** `20` (INFO)

---

### `maxStatusLength`
*   **Description:** The maximum number of displayable characters allowed in a player's status. Color codes (`&c`, `&l`, etc.) and PlaceholderAPI placeholders are **not** counted towards this limit.
*   **Type:** `Integer`
*   **Default:** `15`
*   **Admin Commands:** Can be changed live with `/tsp setmaxlength <length>` and reset with `/tsp resetmaxlength`.

---

### `chatFormatter`
*   **Description:** If `true`, the plugin will format player chat messages to include their status before their name (e.g., `<Status> PlayerName: message`). It also processes color codes in the main chat message if the player has permission.
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
*   **Description:** If `true`, players will not be able to set a fully custom status with `/status <message>` (unless they are admins). Instead, they must choose a status from predefined groups using the `/status <groupname>` command. Admins with `StatusPlugin.admin.setStatus` can still set custom statuses for others using `/status <player> <custom_status>` or `/tsp setstatus <player> <custom_status>`.
*   **Type:** `Boolean`
*   **Default:** `false`

---

### `openingCharacter`
*   **Description:** The character(s) to display *before* the player's status in chat (if `chatFormatter: true`) and tab list (if `changeTablistNames: true`).
*   **Type:** `String`
*   **Default:** `[`

---

### `closingCharacter`
*   **Description:** The character(s) to display *after* the player's status in chat and tab list.
*   **Type:** `String`
*   **Default:** `]`

---

### `statusGroups`
*   **Description:** Defines a list of predefined status groups that players can select if `groupMode` is `true`. Each entry is a group key, under which you define its `status` string and an optional `permissions` list.
*   **Type:** `Map`
*   **Structure:**
    ```yaml
    statusGroups:
      example_group_key: # This is the <groupname> used in commands
        status: "&aOnline and Ready" # The actual status message, supports color codes
        permissions: # Optional: List of specific permissions required to use THIS group
          - 'myplugin.group.example'
          - 'another.permission.node'
      vip_only_group:
        status: "&eVIP Status"
        permissions:
          - 'statusplugin.groupaccess.vip' # Players need this specific permission
      open_group:
        status: "&7Available"
        # No 'permissions' list here, or an empty list:
        # permissions: []
        # Access to this group is controlled by the general 'StatusPlugin.group.set' permission
        # (and potentially 'StatusPlugin.group.set.open_group' if you want to be explicit).
    ```
*   **Permissions Logic for a Group:**
    *   A player must have the base `StatusPlugin.group.set` permission to use the `/status <groupname>` command.
    *   **For a specific group `<groupKey>`:**
        *   If `statusGroups.<groupKey>.permissions` is defined and **not empty**: The player needs to have **at least one** of the permissions listed there.
        *   If `statusGroups.<groupKey>.permissions` is **absent or empty**: The player can use this group if they have `StatusPlugin.group.set`. (Granting `StatusPlugin.group.set.<groupKey>` can also work as an explicit alternative).
*   **Default (Example):**
    ```yaml
    statusGroups:
      admin_group:
        status: '&cAdmin'
        permissions:
          - 'StatusPlugin.group.set.admin_group'
      vip_group:
        status: '&eVIP'
        permissions:
          - 'StatusPlugin.group.set.vip_group'
      default_group:
        status: '&aOnline'
        # No specific permissions defined, will use StatusPlugin.group.set
    ```

---

::: details Example `config.yml` (fileversion: 5)
```yaml
################################
#      Tub's StatusPlugin      #
#          by TubYoub          #
################################
# Don't change this value, it's changed by the plugin if needed
fileversion: 5

# Check for updates on startup
# default: true
checkUpdate: true

# Choose which logging level should be used
# It depends on how much you want you're console to be filled with information from TSP
# For production you can safely set it to a higher level but for development/testing it is recommended to use a lower level
# 10 = Debug
# 20 = Info
# 30 = Warning
# 40 = Error
# default: 20
loggerLevel: 20

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

# Opening and closing characters for the status
# default: '[' & ']'
openingCharacter: '['
closingCharacter: ']'

# Define status groups
# Each group has a name and a status
# You can also define specific permissions required to use a group.
# If 'permissions' is empty or not present, the general 'StatusPlugin.group.set' permission will be checked
# (or if player is OP, or has one of the specific permissions for that group if defined).
statusGroups:
  admin_group:
    status: '&cAdmin'
    permissions:
      - 'StatusPlugin.group.set.admin_group' # Example specific permission
  vip_group:
    status: '&eVIP'
    permissions:
      - 'StatusPlugin.group.set.vip_group'
  default_group:
    status: '&aOnline'
    # No specific permissions: access controlled by 'StatusPlugin.group.set'
```
:::

### Status Data (`statuses.yml`)
Player statuses are stored in `plugins/TubsStatusPlugin/statuses.yml`. This file is managed by the plugin and generally should not be edited manually. It stores player UUIDs mapped to their set status string (with raw `&` codes).