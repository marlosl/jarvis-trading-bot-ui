const enum parameterResources {
    DefaultPercentageTax = "Default Percentage Tax",
	DefaultStopLossPercentage = "Default Stop Loss Percentage",
	DefaultMinimumLimitPercentage = "Default Minimum Limit Percentage",
	DefaultRsiPeriod = "Default RSI Period",
	DefaultRsiOverbought = "Default RSI Overbought",
	DefaultRsiOversold = "Default RSI Oversold",
	TelegramBotId = "Telegram Bot Id",
	TelegramApiId = "Telegram Api Id",
	TelegramChatId = "Telegram Chat Id",
	BinanceApiKey = "Binance Api Key",
	BinanceSecretKey = "Binance Secret Key"
}
const enum botParameterResources {
	Broker = "Broker",
	PercentageTax = "Percentage Tax",
	StopLossPercentage = "Stop Loss Percentage",
	MinimumLimitPercentage = "Minimum Limit Percentage",
	RsiPeriod = "RSI Period",
	RsiOverbought = "RSI Overbought",
	RsiOversold = "RSI Oversold",
	MaxNumberNegotiations = "Max Number Negotiations",
	MinPeriodNextNegotiation = "Min Period Next Negotiation",
	Symbol = "Symbol",
	BuyingQty = "Buying Qty",
	BuyingAsset = "Buying Asset",
	SellingAsset = "Selling Asset",
	StreamSymbol = "Stream Symbol",
	StreamInterval = "Stream Interval",
	Created = "Created",
	Closed = "Closed",
}
export { parameterResources, botParameterResources }