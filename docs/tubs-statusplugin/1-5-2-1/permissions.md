# Permissions Reference 🔑

Tub's Status Plugin uses the following permission nodes to control access to its commands and features. You'll need a Bukkit-compatible permissions plugin (e.g., LuckPerms) to assign these.

The `default` values are as defined in the plugin's `plugin.yml`.

## Player Permissions

*   ### `StatusPlugin.setStatus`
    *   **Description:** Allows a player to set and remove their own status using `/status <message>` and `/status remove`.
    *   **Default:** `true` (all players)

*   ### `StatusPlugin.group.set`
    *   **Description:** Allows a player to use the `/group <groupname>` command (or `/status group <groupname>`) to set their status from predefined groups, *if `groupMode` is enabled in `config.yml`*.
    *   **Default:** `true` (all players)
    *   **Note:** To use a *specific* group, players also need `StatusPlugin.group.set.<groupname>` (see below).

*   ### `StatusPlugin.group.set.<groupname>`
    *   **Description:** Allows a player to select the specific status group named `<groupname>`. Replace `<groupname>` with the actual key from your `statusGroups` in `config.yml`.
    *   **Example:** `StatusPlugin.group.set.t1`, `StatusPlugin.group.set.afk`
    *   **Default:** Not explicitly set per group in `plugin.yml`; must be granted by an admin.

*   ### `StatusPlugin.placeholders`
    *   **Description:** Allows players to use PlaceholderAPI placeholders (from other plugins) within their own status message. Also enables the display of LuckPerms prefixes/suffixes if `%LP_prefix%` or `%LP_suffix%` are used in their status.
    *   **Default:** `op` (This seems to be the effective default based on how it's checked in `StatusManager`, though not explicitly in `plugin.yml` with `default: op`. It's best to grant this explicitly if desired for non-ops.)

## Formatting Permissions

These permissions control which formatting codes players can use in their status messages.

*   ### `StatusPlugin.formatting.color`
    *   **Description:** Allows the use of color codes (`&0-&9`, `&a-&f`).
    *   **Default:** `op`

*   ### `StatusPlugin.formatting.bold`
    *   **Description:** Allows the use of the bold code (`&l`).
    *   **Default:** `op`

*   ### `StatusPlugin.formatting.italic`
    *   **Description:** Allows the use of the italic code (`&o`).
    *   **Default:** `op`

*   ### `StatusPlugin.formatting.underline` <!-- Corrected from 'underlined' in README -->
    *   **Description:** Allows the use of the underline code (`&n`).
    *   **Default:** `op`

*   ### `StatusPlugin.formatting.strikethrough`
    *   **Description:** Allows the use of the strikethrough code (`&m`).
    *   **Default:** `op`

*   ### `StatusPlugin.formatting.magic`
    *   **Description:** Allows the use of the obfuscated/magic code (`&k`).
    *   **Default:** `op`

## Admin Permissions

*   ### `StatusPlugin.admin.setStatus`
    *   **Description:** Allows setting and removing the status of *other* players using `/status <player> <message>` and `/status remove <player>`.
    *   **Default:** `op`

*   ### `StatusPlugin.admin.reload`
    *   **Description:** Allows reloading the plugin's configuration and status data using `/status reload`.
    *   **Default:** `op`

*   ### `StatusPlugin.admin.setMaxlength`
    *   **Description:** Allows setting the maximum character length for statuses using `/status setmaxlength <length>`.
    *   **Default:** `op`

*   ### `StatusPlugin.admin.resetMaxlength`
    *   **Description:** Allows resetting the maximum status length to its default value using `/status resetmaxlength`.
    *   **Default:** `op`

*   ### `StatusPlugin.admin` (Implied for Update Notifications)
    *   **Description:** While not a command permission, players with `StatusPlugin.admin` (or a general admin permission that includes this node if you set it up) will receive in-game notifications about critical/high urgency plugin updates if `checkUpdate: true` is enabled.
    *   **Default:** Not explicitly set in `plugin.yml` for this purpose; grant to admins.

::: tip Default Values
*   `default: true` means all players have the permission by default.
*   `default: op` means only server operators have the permission by default.
Permissions not explicitly defaulted (like `StatusPlugin.group.set.<groupname>`) must be granted manually.
:::
