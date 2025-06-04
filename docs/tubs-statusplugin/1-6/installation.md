# Installation Guide 🚀

Setting up Tub's Status Plugin on your Spigot, Paper, or compatible Bukkit-based server is simple:

1.  **Download the Plugin:**
    Get the latest `.jar` file for Tub's Status Plugin from its official Modrinth page:
    *   [Modrinth (Recommended)](https://modrinth.com/plugin/tubs-status-plugin) (Project ID: `km0yAITg`)

2.  **Place the Plugin File:**
    Navigate to your server's `plugins` folder and place the downloaded `TubsStatusPlugin-vX.Y.Z.jar` file into it. (Replace `X.Y.Z` with the actual version, e.g., `1.6`).

3.  **Dependencies (Soft Dependencies):**
    While not strictly required for basic operation, Tub's Status Plugin offers enhanced features if these plugins are present:
    *   **PlaceholderAPI:** Required for using StatusPlugin placeholders (e.g., `%tubsstatusplugin_status%`) in other plugins and for using other PAPI placeholders within status messages. Download from [PlaceholderAPI's eCloud](https://www.spigotmc.org/resources/placeholderapi.6245/).
    *   **LuckPerms:** Required if you want to use LuckPerms prefix/suffix placeholders (`%LP_prefix%`, `%LP_suffix%`) within the status display. Download from [LuckPerms Official Site](https://luckperms.net/download).
    Install these plugins by placing their JAR files in your `plugins` folder as well.

4.  **Start or Restart Your Server:**
    Start or restart your Minecraft server.

    ::: info First Launch
    On its first launch, Tub's Status Plugin will:
    *   Generate its main configuration file: `plugins/TubsStatusPlugin/config.yml`
    *   Create a `statuses.yml` file (if it doesn't exist) in `plugins/TubsStatusPlugin/` to store player statuses.
    *   Register its commands (`/status`, `/tsp`) and event listeners.
    *   Attempt to hook into PlaceholderAPI and LuckPerms if they are detected.
    :::

5.  **Review Configuration (Recommended):**
    It's advisable to review `plugins/TubsStatusPlugin/config.yml` and adjust settings like `maxStatusLength`, `chatFormatter`, `groupMode`, `loggerLevel`, etc., to fit your server. See the [Configuration Guide](./configuration.md).

6.  **(Optional) Permissions:**
    Configure permissions for commands and formatting using a permissions plugin (e.g., LuckPerms). Refer to the [Permissions Guide](./permissions.md).

::: tip Check Console Logs!
After installation, always check your server console logs for messages from `[TSP]` or `TubsStatusPlugin`. This confirms the plugin loaded correctly and indicates if PlaceholderAPI and LuckPerms hooks were successful. The `loggerLevel` in `config.yml` can be set to `10` (DEBUG) for more detailed logs during setup or troubleshooting.
:::

Tub's Status Plugin is now ready for your players to set their statuses!