# To learn more about how to use Nix to configure your environment
# see: https://developers.google.com/idx/guides/customize-idx-env
{ pkgs, ... }: {
  # Which nixpkgs channel to use.
  channel = "stable-24.11"; # or "unstable"
  # Use https://search.nixos.org/packages to find packages
  packages = [
    pkgs.bun
  ];
  # Sets environment variables in the workspace
  env = {};
  idx = {
    # Search for the extensions you want on https://open-vsx.org/ and use "publisher.id"
    extensions = [
      # "vscodevim.vim"
      "bradlc.vscode-tailwindcss",
      "dbaeumer.vscode-eslint",
      "esbenp.prettier-vscode",
      "heybourn.headwind",
      "oven.bun-vscode",
      "rangav.vscode-thunder-client"
    ];
    workspace = {
      # Runs when a workspace is first created with this `dev.nix` file
      onCreate = {
        bun-install = "bun install";
        # Open editors for the following files by default, if they exist:
        default.openFiles = [ "package.json" ];
      };
      # To run something each time the workspace is (re)started, use the `onStart` hook
      onStart = {
        run-server = "bun --filter '*' dev";
      };
    };
  };
   # Enable previews and customize configuration
  idx.previews = {
    enable = true;
    previews = {
      frontend = {
        manager = "web";
        port = 5173;
      };
    };
  };
}
