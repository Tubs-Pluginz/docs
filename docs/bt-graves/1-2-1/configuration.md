# Configuration Guide ⚙️

BT Graves's behavior is controlled by the `config.yml` file, located in the `plugins/BTGraves/` folder. This file is generated with default values when the plugin first loads.

::: tip Backup Your Config!
Before making significant changes, it's wise to back up your `config.yml`.
:::

Below is a detailed explanation of each option:

---

### `fileversion`
*   **Description:** An internal version number for the configuration file. The plugin uses this to manage automatic updates to the config structure if future plugin versions introduce changes.
*   **Action:** **Do not change this value manually.**
*   **Default:** (Automatically set by the plugin, e.g., `1`)

---

### `checkVersion`
*   **Description:** If set to `true`, the plugin will check Modrinth for new versions of BTGraves when the server starts. If an update is available, a notification will be logged to the console, and players with the `btgraves.admin` permission will be notified on join (for critical/high urgency updates).
*   **Type:** `Boolean`
*   **Default:** `true`
*   **Example:** `checkVersion: true`

---

### `graveTimeout`
*   **Description:** The duration (in minutes) that a grave will remain in the world before it expires. When a grave expires and a player is nearby (within 50 blocks), its contents (items and XP orbs) will be dropped at its location, and the grave will be removed.
*   **Type:** `Integer` (minutes)
*   **Special Value:** Set to `-1` if you want graves to last indefinitely (never expire automatically).
*   **Default:** `60` (1 hour)
*   **Example:** `graveTimeout: 120` (for 2 hours)
    ```yaml
    graveTimeout: -1 # Graves will never expire
    ```

---

### `smallArmorStand`
*   **Description:** If `true`, the invisible armor stand that represents the grave's interactive hitbox will be small. This makes the hitbox smaller and also slightly lowers the height of the floating name tag ("Player's Grave - Time"). If `false`, a normal-sized armor stand hitbox is used.
*   **Type:** `Boolean`
*   **Default:** `true`
*   **Example:** `smallArmorStand: false`

---

### `expPercentage`
*   **Description:** The percentage of a player's total experience points (levels and progress towards the next level) that will be saved in their grave upon death. The rest is lost as per normal Minecraft mechanics.
*   **Type:** `Integer` (percentage)
*   **Range:** `0` (save no XP) to `100` (save all XP). Values outside this range will be clamped.
*   **Default:** `100`
*   **Example:** `expPercentage: 50` (save half of the player's XP)

---

::: details Example `config.yml`
```yaml
################################
#          BT Graves        #
#         by BT Pluginz       #
################################
#------------------------------
# Do not touch this value
# The Plugin updates the config file using it.
fileversion: 1
#------------------------------

# If the Plugin should check for new Versions
# default: true
checkVersion: true
# How long should graves last (in minutes)
# If you don't want to delete graves set to -1
# default: 60
graveTimeout: 60
# If the Armor stand should be small or not
# this changes the Hitbox of the Grave and
# the Height of the "Hologram" (Text)
# default: true
smallArmorStand: true
# How much % of the Players Experience should be saved
# 0 - 100
# default: 100
expPercentage: 100
```
:::
