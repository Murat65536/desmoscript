export const makeChannel = (
  channelName: string,
  sender: { send?: (data: any) => void },
  receiver: NodeJS.EventEmitter
) => ({
  send(msg: any) {
    sender.send({
      channel: channelName,
      msg,
    });
  },

  onReceive(handler: (msg: any) => void) {
    const listener = ({ channel, msg }) => {
      if (channel !== channelName) return;
      handler(msg);
    };
    receiver.setMaxListeners(Infinity);
    receiver.on("message", listener);

    return () => receiver.off("message", listener);
  },
});
