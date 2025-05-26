# Installation Guide 🚀

Installing BT's CombatLogger on your Spigot, Paper, or compatible Bukkit-based server is quick and easy:

1.  **Download the Plugin:**
    Obtain the latest `.jar` file for BT's CombatLogger from its official release page:
    *   [Modrinth (Recommended)](https://modrinth.com/plugin/bts-combatlogger) <!-- Replace with actual Modrinth link -->
    *   [GitHub Releases](https://github.com/BT-Pluginz/CombatLogger/releases) <!-- Adjust if this is not the correct repo -->

2.  **Place the Plugin File:**
    Navigate to your server's `plugins` folder and place the downloaded `BTsCombatLogger-vx.y.z.jar` file into it.

3.  **Start or Restart Your Server:**
    Start or restart your Minecraft server.

    ::: info First Launch
    On its first launch, BT's CombatLogger will:
    *   Generate its main configuration file: `plugins/CombatLogger/config.yml`
    *   Create an `allies.yml` file (if it doesn't exist) in `plugins/CombatLogger/` to store player alliances.
    *   Register its commands and event listeners.
    :::

4.  **Review Configuration (Recommended):**
    While the plugin functions with default settings, it's advisable to review `plugins/CombatLogger/config.yml` and adjust `combatTimeout` to your server's needs. See the [Configuration Guide](./configuration.md).

5.  **(Optional) Permissions:**
    Configure permissions for commands using a permissions plugin like LuckPerms. Refer to the [Permissions Guide](./permissions.md).

::: tip Check Console Logs!
After installation, always check your server console logs for messages from `[BTCL]` or `BT's CombatLogger`. This confirms the plugin loaded correctly. Look for the startup banner!
:::

BT's CombatLogger is now installed and will begin monitoring combat activity.
