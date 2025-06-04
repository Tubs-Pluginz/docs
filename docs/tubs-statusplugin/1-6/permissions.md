# Permissions Reference 🔑

Tub's Status Plugin uses the following permission nodes to control access to its commands and features. You'll need a Bukkit-compatible permissions plugin (e.g., LuckPerms) to assign these.

The `Default` values indicate who has the permission without explicit assignment:
*   `true`: All players.
*   `op`: Only server operators.
*   `false` or not listed: No one by default; must be granted.

## Player Permissions

*   ### `StatusPlugin.setStatus`
    *   **Description:** Allows a player to set and remove their own status using `/status <message>` and `/status remove`.
    *   **Default:** `true`

*   ### `StatusPlugin.group.set`
    *   **Description:** Allows a player to use the `/status <groupname>` command to set their status from predefined groups, *if `groupMode` is enabled in `config.yml`*. This is the base permission for using group functionality. Specific group access may require additional permissions (see below).
    *   **Default:** `true`

*   ### `StatusPlugin.group.set.<groupname>`
    *   **Description:** Allows a player to select the specific status group named `<groupname>` (where `<groupname>` is a key from `statusGroups` in `config.yml`). This permission is typically used if the group in `config.yml` **does not** have its own `permissions` list defined.
    *   **Example:** `StatusPlugin.group.set.vip_group`
    *   **Default:** `false` (Must be granted by an admin if not covered by a group's specific `permissions` list in `config.yml`)
    *   **Note:** If a group in `config.yml` has a non-empty `permissions: [...]` list, players need one of *those* custom permissions instead of this node for that specific group. If the `permissions` list is empty or absent, this node (or general `StatusPlugin.group.set` if this node isn't granted) is effectively checked. See [Configuration Guide](./configuration.md#statusgroups) for details.

*   ### `StatusPlugin.placeholders`
    *   **Description:** Allows players to use PlaceholderAPI placeholders (from other plugins) within their own status message. Also enables the display of LuckPerms prefixes/suffixes if `%LP_prefix%` or `%LP_suffix%` are used in their status.
    *   **Default:** `op`

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

*   ### `StatusPlugin.formatting.underline`
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
    *   **Description:** Allows setting and removing the status (custom or group) of *other* players using `/status <player> <status|groupname>` or `/tsp setstatus <player> <status|groupname>` and `/status remove <player>` or `/tsp remove <player>`.
    *   **Default:** `op`

*   ### `StatusPlugin.admin.reload`
    *   **Description:** Allows reloading the plugin's configuration and status data using `/tsp reload`.
    *   **Default:** `op`

*   ### `StatusPlugin.admin.setMaxlength`
    *   **Description:** Allows setting the maximum character length for statuses using `/tsp setmaxlength <length>`.
    *   **Default:** `op`

*   ### `StatusPlugin.admin.resetMaxlength`
    *   **Description:** Allows resetting the maximum status length to its default value using `/tsp resetmaxlength`.
    *   **Default:** `op`

*   ### `StatusPlugin.admin`
    *   **Description:** Players with this permission will receive in-game notifications about critical/high urgency plugin updates if `checkUpdate: true` is enabled in `config.yml`.
    *   **Default:** `op`