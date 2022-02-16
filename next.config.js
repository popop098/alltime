module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.discordapp.com','opencdn.winsub.kr'],
  },
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.fallback.fs = false;
        }
        config.module.rules.push(
            {
                test: /\.md$/,
                use: "raw-loader"
            },
            {
                test: /\.txt$/,
                use: "raw-loader"
            },
            {
                test: /\.pdf$/,
                use: "raw-loader"
            },

        );
        return config;
    },
    node: {
        dns: 'empty',
        net: 'empty'
    }
};
