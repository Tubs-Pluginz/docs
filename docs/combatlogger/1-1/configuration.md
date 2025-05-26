# Configuration Guide ⚙️

BT's CombatLogger uses a simple `config.yml` file, located in the `plugins/CombatLogger/` folder. This file is generated with default values when the plugin first loads.

::: tip Backup Your Config!
It's always a good idea to back up `config.yml` before making changes.
:::

Here's a breakdown of each option:

---

### `fileversion`
*   **Description:** An internal version number for the configuration file. The plugin uses this to manage potential automatic updates to the config structure in future plugin versions.
*   **Action:** **Do not change this value manually.**
*   **Default:** `1`

---

### `checkVersion`
*   **Description:** If set to `true`, the plugin will check Modrinth for new versions of BT's CombatLogger when the server starts. If an update is available, a notification will be logged to the console.
*   **Type:** `Boolean`
*   **Default:** `true`
*   **Example:** `checkVersion: true`

---

### `combatTimeout`
*   **Description:** The duration (in seconds) that a player will remain tagged as "in combat" after their last combat action (dealing or receiving damage from another non-allied player). If a player logs out during this period, they will be penalized.
*   **Type:** `Integer` (seconds)
*   **Default:** `30`
*   **Example:** `combatTimeout: 60` (for a 1-minute combat tag)
    ::: tip Setting the Timeout
    A shorter timeout is less restrictive but might allow players to escape combat more easily. A longer timeout is more punitive but might frustrate players tagged for extended periods after a brief engagement. Choose a value that suits your server's PvP style.
    :::

---

::: details Example `config.yml`
```yaml
################################
#          CombatLogger        #
#         by BT Pluginz        #
################################
# DO NOT TOUCH THIS VALUE
fileversion: 1

# If the Plugin should check for new Versions
# default: true
checkVersion: true
# How Long Players should be in Combat (in seconds)
# default: 30
combatTimeout: 30
```
:::

### Ally Data (`allies.yml`)

In addition to `config.yml`, BT's CombatLogger uses `plugins/CombatLogger/allies.yml` to store player alliances. This file is managed automatically by the plugin when players use the `/cl ally` commands. You generally do not need to edit this file manually.
