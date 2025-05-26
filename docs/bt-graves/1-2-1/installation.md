# Installation Guide 🚀

Installing BT Graves on your Spigot, Paper, or compatible Bukkit-based server is straightforward:

1.  **Download the Plugin:**
    Obtain the latest `.jar` file for BT Graves from its official release page:
    *   [Modrinth (Recommended)](https://modrinth.com/plugin/bt-graves)
    *   [GitHub Releases](https://github.com/BT-Pluginz/GravePlugin/releases) <!-- Adjust if this is not the correct repo -->

2.  **Place the Plugin File:**
    Navigate to your server's `plugins` folder and place the downloaded `BTGraves-x.y.z.jar` file into it.

3.  **Start or Restart Your Server:**
    Start or restart your Minecraft server.

    ::: info First Launch
    On its first launch, BTGraves will:
    *   Generate its main configuration file: `plugins/BTGraves/config.yml`
    *   Create a `graves.yml` file (if it doesn't exist) to store active grave data.
    *   Register its commands and event listeners.
    :::

4.  **Initial Configuration (Recommended):**
    While the plugin works with default settings, it's recommended to review and adjust `plugins/BTGraves/config.yml` to your preferences (e.g., `graveTimeout`, `expPercentage`).

    Refer to the [Configuration Guide](./configuration.md) for detailed explanations of all options.

5.  **(Optional) Permissions:**
    If you want to restrict command usage or grant admin access, configure permissions using a permissions plugin like LuckPerms. See the [Permissions Guide](./permissions.md).

::: tip Check Your Logs!
After installation, always check your server console logs for any messages from `[BTGraves]`. This will help you confirm if the plugin loaded correctly. Look for the startup banner!
:::

BT Graves is now installed and will begin creating graves when players die (unless `keepInventory` gamerule is true).
