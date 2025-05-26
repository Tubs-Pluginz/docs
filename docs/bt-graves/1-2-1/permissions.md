# Permissions Reference 🔑

BT Graves uses a few permission nodes to control access to administrative commands and features. You'll need a Bukkit-compatible permissions plugin (like LuckPerms) to assign these to your players or staff groups.

## Command Permissions

*   ### `btgraves.reload`
    *   **Description:** Allows a user to execute the `/grave reload` command.
    *   **Purpose:** Grants the ability to reload the BTGraves `config.yml` file without a full server restart.
    *   **Default:** `op` (Operators have this by default, as per `plugin.yml`)

*   ### `btgraves.admin.open`
    *   **Description:** Allows a user to execute the `/grave open <graveId>` command.
    *   **Purpose:** Grants the ability for administrators to open and inspect the contents of any player's grave, provided they know the Grave ID.
    *   **Default:** `op` (Operators have this by default, as per `plugin.yml`)

## Notification Permissions

*   ### `btgraves.admin`
    *   **Description:** While not tied to a specific command in the provided code, the `PlayerJoinListener.java` checks for this permission (`player.hasPermission("btgraves.admin")`) to notify administrators about critical or high-urgency plugin updates when they join the server (if `checkVersion: true` is enabled in `config.yml`).
    *   **Purpose:** Keeps administrators informed about important updates.
    *   **Recommendation:** Grant this to your server administrators or staff group responsible for plugin maintenance.
    *   **Default:** Not explicitly defined in `plugin.yml` for this specific notification use, so it would depend on your permissions plugin's default handling or if you grant it explicitly. It's good practice to assign it.

::: tip Default Permissions
The `default: op` in `plugin.yml` means that server operators will have these permissions by default. For non-operators, you must explicitly grant these permissions using your permissions plugin.
:::
