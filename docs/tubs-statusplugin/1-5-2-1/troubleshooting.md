# Troubleshooting Guide 🛠️

Experiencing issues with Tub's Status Plugin? This guide will help you diagnose and resolve them.

## 1. Initial Checks ✅

*   **Latest Plugin Version:** Ensure you're using the most recent version of Tub's Status Plugin from [Modrinth](https://modrinth.com/plugin/tubs-status-plugin).
*   **Server Version:** The plugin targets API 1.13+ (compatible up to 1.21+ as per README). Verify your server (Spigot, Paper, etc.) is within this range.
*   **Java Version:** The `pom.xml` indicates Java 1.8. Ensure your server runs Java 8 or a compatible newer version.
*   **Console Logs:** Your primary tool! Check `logs/latest.log` for errors or warnings from `[TSP]` or `TubsStatusPlugin` during startup or when the issue occurs.
*   **`config.yml`:** Review `plugins/TubsStatusPlugin/config.yml` for typos, correct values, and valid YAML syntax.
*   **Dependencies:**
    *   If using PlaceholderAPI features, is PlaceholderAPI installed and enabled?
    *   If using LuckPerms prefix/suffix features, is LuckPerms installed and enabled?

## 2. Common Issues & Solutions

### A. Status Not Setting or Displaying

::: details Symptoms & Checklist
**Symptoms:**
*   `/status <message>` command seems to work, but the status doesn't appear in tab, above head, or in chat.
*   Status appears in some places but not others.

**Checklist:**
1.  **Permissions:**
    *   Does the player have `StatusPlugin.setStatus`?
    *   If using color/formatting codes, do they have the relevant `StatusPlugin.formatting.<type>` permissions (e.g., `StatusPlugin.formatting.color`)? By default, these are OP-only.
2.  **`config.yml` Settings:**
    *   Is `changeTablistNames: true` if you expect it in the tab list?
    *   Is `chatFormatter: true` if you expect it in chat?
3.  **`maxStatusLength`:** Is the *visible* part of the status (after removing color codes/placeholders) within the configured `maxStatusLength`?
4.  **Spaces in Status:** If your status needs spaces, did you use `&_` in the command? E.g., `/status Hello&_World`. Regular spaces might be trimmed by Bukkit's command argument parser.
5.  **Plugin Conflicts (Display):**
    *   Do you have other plugins that manage tab list formatting, player display names, or chat formatting with high priority? They might be overriding Tub's Status Plugin.
    *   Try temporarily removing other such plugins to test.
6.  **Console Errors:** Check for any errors when the status is set or when a player joins/chats.
7.  **PlaceholderAPI/LuckPerms Hooks:**
    *   If using PAPI/LP placeholders in status: Are PAPI/LP installed and working? Does the player have `StatusPlugin.placeholders` permission?
    *   Check startup logs to see if Tub's Status Plugin successfully hooked into PAPI/LP.
:::

### B. Group Mode Issues

::: details Symptoms & Checklist
**Symptoms:**
*   Players can still set custom statuses even if `groupMode: true`.
*   `/group <groupname>` command doesn't work or says "Invalid group name."
*   Players can't use a specific group status.

**Checklist:**
1.  **`groupMode: true`:** Is this correctly set in `config.yml` and the plugin reloaded/restarted?
2.  **`statusGroups` Definition (`config.yml`):**
    *   Are your groups defined correctly under `statusGroups:` with a `status:` sub-key?
    *   Is the `<groupname>` used in the command an exact match (case-sensitive) to a key in `statusGroups`?
3.  **Permissions for Groups:**
    *   Does the player have the base `StatusPlugin.group.set` permission (default: true)?
    *   Does the player have the specific permission for the group they are trying to set, e.g., `StatusPlugin.group.set.t1` or `StatusPlugin.group.set.mycustomgroup`? This permission is **required** for each group.
:::

### C. PlaceholderAPI Placeholders Not Working

::: details Symptoms & Checklist
**Symptoms:**
*   Placeholders like `%tubsstatusplugin_status%` show as raw text.
*   Placeholders used *within* a status (e.g., `%player_name%`) are not parsed.

**Checklist:**
1.  **PlaceholderAPI Installed & Enabled:** Is PAPI actually on your server and running? Check `/plugins`.
2.  **Expansion Registered:** Did Tub's Status Plugin successfully register its expansion? Check startup logs for messages like "Tub's StatusPlugin will now use PlaceholderAPI" or any PAPI-related errors. You can also run `/papi ecloud list` and see if `tubsstatusplugin` is listed (it might not be an eCloud one, but `/papi list` should show registered ones).
3.  **Correct Placeholder Syntax:**
    *   For placeholders *provided by this plugin*: `%tubsstatusplugin_status%` or `%tubsstatusplugin_status_PlayerName%`.
    *   For using *other PAPI placeholders in a status*: Ensure the placeholder itself is valid (e.g., `%vault_eco_balance%`) and the originating plugin is working.
4.  **`StatusPlugin.placeholders` Permission:** Does the player whose status contains PAPI placeholders (or the player for whom `%tubsstatusplugin_status%` is being parsed, though this is less likely the issue for the latter) have this permission?
:::

### D. LuckPerms Prefix/Suffix Not Appearing in Status

::: details Symptoms & Checklist
**Symptoms:**
*   `%LP_prefix%` or `%LP_suffix%` in a status message shows as raw text.

**Checklist:**
1.  **LuckPerms Installed & Enabled:** Is LuckPerms on your server and functioning?
2.  **`StatusPlugin.placeholders` Permission:** The player setting the status needs this permission.
3.  **Correct Placeholder Strings:** Ensure you are using exactly `%LP_prefix%` and `%LP_suffix%`.
4.  **Prefix/Suffix Existence:** Does the player actually *have* a prefix and/or suffix set in LuckPerms?
5.  **Plugin Hook:** Check startup logs to see if Tub's Status Plugin successfully hooked into LuckPerms.
:::

### E. Plugin Not Loading / Errors on Startup

::: details Symptoms & Checklist
**Symptoms:**
*   Tub's Status Plugin not in `/plugins`.
*   Errors related to `de.tubyoub.statusplugin` in console during server startup.

**Checklist:**
1.  **Java Version:** `pom.xml` specifies Java 1.8. Ensure your server runs Java 8 or a compatible newer version.
2.  **Server API Version:** `plugin.yml` states `api-version: 1.13`. Ensure your server software is 1.13+.
3.  **Corrupted JAR:** Try re-downloading the plugin JAR.
4.  **Dependencies in `plugins` folder:** If soft dependencies like PlaceholderAPI or LuckPerms are intended to be used, ensure their JARs are also in the `plugins` folder.
5.  **`config.yml` Syntax (Severe):** A completely broken `config.yml` could cause issues. Back it up, delete it, and let the plugin regenerate a default one to test.
:::

## 3. Providing Information for Support 🆘

If you're still facing issues, please join our [community discord](https://discord.pluginz.dev) for assistance!

To help us help you, please provide:

*   **Tub's Status Plugin Version:** (e.g., `1.5.2.1`)
*   **Server Software & Version:** (e.g., Paper 1.20.1, Spigot 1.19.4)
*   **Java Version:** (Output of `java -version`)
*   **List of other plugins:** (Output of `/plugins`)
*   **Your `config.yml` for Tub's Status Plugin.**
*   **Relevant Console Logs:** With errors or relevant messages. Use a service like [Pastebin](https://pastebin.com/) or [mclo.gs](https://mclo.gs/) for long logs.
*   **Clear Description of the Issue:** What you expect vs. what happens.
*   **Steps to Reproduce.**

The more details, the better!
