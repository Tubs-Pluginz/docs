# Frequently Asked Questions (FAQ) ❓

Find answers to common questions about Tub's Status Plugin.

::: tip Pro Tip!
Before asking, ensure you've checked:
1.  The latest plugin version.
2.  Your `config.yml` for errors.
3.  Server console logs for `[TSP]` messages.
The [Troubleshooting Guide](./troubleshooting.md) is also a great resource!
:::

<details>
  <summary><b>Q: How do I use color codes or formatting in my status?</b></summary>
  You can use standard Minecraft `&` codes if you have the appropriate `StatusPlugin.formatting.< type>` permission. For example:
  *   `&c` for Red, `&a` for Green, `&l` for Bold, `&o` for Italic.
  *   To set a status like "&cImportant &lNotice", you would type: `/status &cImportant&_&lNotice`
  *   Use `&_` to represent a space, as regular spaces might be trimmed by the command parser depending on your setup.
  *   View all codes with `/status help colors`.
</details>

<details>
  <summary><b>Q: My status is getting cut off. Why?</b></summary>
  This is likely due to the `maxStatusLength` setting in `config.yml` (default is 15 characters). This limit applies to the *displayed* characters, not including color codes or PlaceholderAPI placeholders. An admin can change this limit with `/status setmaxlength < length>`.
</details>

<details>
  <summary><b>Q: Why isn't my status showing up in the tab list or chat?</b></summary>
  Check these settings in `config.yml`:
  *   `changeTablistNames: true` (for tab list display)
  *   `chatFormatter: true` (for status in chat messages)
  If these are true and it's still not working, ensure no other plugin is overriding tab list or chat formatting with higher priority. Also, tab list updates might sometimes require a player relog or server restart to fully propagate for all clients. The plugin does attempt to refresh tab names periodically.
</details>

<details>
  <summary><b>Q: Can I use PlaceholderAPI placeholders in my status?</b></summary>
  Yes! If PlaceholderAPI is installed on your server and you have the `StatusPlugin.placeholders` permission, you can include PAPI placeholders in your status message (e.g., `/status My balance: %vault_eco_balance%`). These will be parsed and displayed.
</details>

<details>
  <summary><b>Q: How does the LuckPerms prefix/suffix integration work?</b></summary>
  If LuckPerms is installed and you have the `StatusPlugin.placeholders` permission, you can use `%LP_prefix%` and `%LP_suffix%` in your status message. The plugin will replace these with your current LuckPerms prefix and suffix. For example: `/status %LP_prefix% &7MyText &f%LP_suffix%`.
</details>

<details>
  <summary><b>Q: What is "Group Mode" and how do I use it?</b></summary>
  If `groupMode: true` is set in `config.yml`:
  *   Players cannot set custom statuses with `/status < message>`.
  *   They must choose a status from predefined groups using `/group < groupname>` (or `/status group < groupname>`).
  *   Groups are defined in `config.yml` under `statusGroups`.
  *   To use a specific group, a player needs `StatusPlugin.group.set` AND `StatusPlugin.group.set.< groupname>` permissions.
</details>

<details>
  <summary><b>Q: Do statuses save if the server restarts?</b></summary>
  Yes, player statuses are saved to `plugins/TubsStatusPlugin/statuses.yml` and are reloaded when the server starts or when `/status reload` is used.
</details>

<details>
  <summary><b>Q: How often do PlaceholderAPI placeholders in statuses update in the tab list?</b></summary>
  The plugin schedules a task to refresh player display names (which includes parsing PAPI placeholders in statuses) in the tab list approximately every 30 seconds (600 game ticks) by default if `changeTablistNames: true`.
</details>

<details>
  <summary><b>Q: What if I use a color code I don't have permission for?</b></summary>
  The `StatusManager` attempts to strip formatting codes for which the player does not have the corresponding `StatusPlugin.formatting.< type>` permission. For example, if you try to use `&c` (red) without `StatusPlugin.formatting.color`, the `&c` might be removed, and the text will appear in the default color.
</details>

---

Still stuck? Visit our [community discord](https://discord.pluginz.dev) for help!
