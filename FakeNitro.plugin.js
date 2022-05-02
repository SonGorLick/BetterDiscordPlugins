/**
 * @name FakeNitro
 * @author Ahlawat
 * @authorId 887483349369765930
 * @version 0.1.0
 * @description Just enables nitro features but only client side features work (In Short Just Streaming 1080p 60FPS)
 * @website https://wife-ruby.ml
 * @source https://github.com/Tharki-God/BetterDiscordPlugins
 * @updateUrl https://raw.githubusercontent.com/Tharki-God/BetterDiscordPlugins/master/FakeNitro.plugin.js
 */
module.exports = (() => {
	const config = {
		info: {
			name: "FakeNitro",
			authors: [
				{
					name: "Ahlawat",
					discord_id: "887483349369765930",
					github_username: "Tharki-God",
				},
			],
			version: "0.1.0",
			description:
				"Just enables nitro features but only client side features work (In Short Just Streaming 1080p 60FPS)",
			github: "https://github.com/Tharki-God/BetterDiscordPlugins",
			github_raw:
				"https://raw.githubusercontent.com/Tharki-God/BetterDiscordPlugins/master/FakeNitro.plugin.js",
		},
		main: "FakeNitro.plugin.js",
	};

	return !global.ZeresPluginLibrary
		? class {
			constructor() {
				this._config = config;
			}
			getName() {
				return config.info.name;
			}
			getAuthor() {
				return config.info.authors.map((a) => a.name).join(", ");
			}
			getDescription() {
				return config.info.description;
			}
			getVersion() {
				return config.info.version;
			}
			load() {

				BdApi.showConfirmationModal(
					"Library Missing",
					`The library plugin needed for ${config.info.name} is missing. Please click Download Now to install it.`,
					{
						confirmText: "Download Now",
						cancelText: "Cancel",
						onConfirm: () => {
							require("request").get(
								"https://rauenzi.github.io/BDPluginLibrary/release/0PluginLibrary.plugin.js",
								async (error, response, body) => {
									if (error)
										return require("electron").shell.openExternal(
											"https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/rauenzi/BDPluginLibrary/master/release/0PluginLibrary.plugin.js"
										);
									await new Promise((r) =>
										require("fs").writeFile(
											require("path").join(
												BdApi.Plugins.folder,
												"0PluginLibrary.plugin.js"
											),
											body,
											r
										)
									);
								}
							);
						},
					}
				);
			}
			start() { }
			stop() { }
		}
		: (([Plugin, Api]) => {
			const plugin = (Plugin, Api) => {
				const { Patcher, DiscordModules, Settings, PluginUtilities } = Api;
				return class FakeNitro extends Plugin {
					onStart() {
						const user = ZeresPluginLibrary.DiscordModules.UserStore.getCurrentUser();
						if (!user) return;
						if (user.premiumType === 2) {
							BdApi.alert("Are you Sure about that?",
								"Well You already have nitro so you dont even need it. But IDC, whatever!~ ");
						}
						if (user.premiumType === 1) {
							BdApi.alert("Are you Sure about that?",
								"Well You already have nitro and I know its nitro classic but thats all needed for 1080p 60FPS Stream so you dont actually need this. Just letting you know."
							);
						}
						this.orginal = user.premiumType;
						user.premiumType = 2;
					}
					onStop() {
						const user = ZeresPluginLibrary.DiscordModules.UserStore.getCurrentUser();
						if (!user) return;
						user.premiumType = this.orginal;
					}
				};
			};
			return plugin(Plugin, Api);
		})(global.ZeresPluginLibrary.buildPlugin(config));
})();
/*@end@*/
