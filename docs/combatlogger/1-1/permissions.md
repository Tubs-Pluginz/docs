# Permissions Reference 🔑

BT's CombatLogger uses the following permission nodes to control access to its commands and features. You will need a Bukkit-compatible permissions plugin (e.g., LuckPerms) to manage these.

The `default` values listed are taken from the `plugin.yml`.

## Admin & Management Permissions

*   ### `combatlogger.start`
    *   **Description:** Allows the use of the `/cl start <player>` command.
    *   **Purpose:** Manually put a specific player into combat mode.
    *   **Default:** `op`

*   ### `combatlogger.stop`
    *   **Description:** Allows the use of the `/cl stop <player>` command.
    *   **Purpose:** Manually remove a specific player from combat mode.
    *   **Default:** `op`

*   ### `combatlogger.list`
    *   **Description:** Allows the use of the `/cl list` command.
    *   **Purpose:** View all players currently tagged as in combat.
    *   **Default:** `op`

*   ### `combatlogger.settimer`
    *   **Description:** Allows the use of the `/cl settime [seconds]` command.
    *   **Purpose:** Get or set the global combat timer duration.
    *   **Default:** `op`

*   ### `combatlogger.reload`
    *   **Description:** Allows the use of the `/cl reload` command.
    *   **Purpose:** Reload the plugin's configuration (`config.yml`) and ally data (`allies.yml`).
    *   **Default:** `op`

## Player Permissions

These permissions are typically granted to all players by default.

*   ### `combatlogger.ally`
    *   **Description:** Allows the use of the `/cl ally <add|remove|accept|deny> <player>` commands.
    *   **Purpose:** Enables players to manage their alliances to prevent friendly fire from triggering combat tags.
    *   **Default:** `true` (all players)

*   ### `combatlogger.help`
    *   **Description:** Allows the use of the `/cl help` command.
    *   **Purpose:** Lets players see a list of CombatLogger commands they have access to.
    *   **Default:** `true` (all players)

*   ### `combatlogger.info`
    *   **Description:** Allows the use of the `/cl info` command.
    *   **Purpose:** Lets players view basic information about the plugin.
    *   **Default:** `true` (all players)

::: tip Default Values
*   `default: op` means only server operators will have the permission by default.
*   `default: true` means all players will have the permission by default.
You can override these defaults using your server's permissions plugin.
:::
