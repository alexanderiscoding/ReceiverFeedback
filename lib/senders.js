function makerSender(application, version, brandName, brandVersion, systemName, systemVersion, architecture, message, ID, token, thisHost, service, mode) {
  let header = "Um novo Feedback foi registrado";
  let url = "https://" + thisHost + "/api/view/" + ID + "/" + token;
  let urlMessage = "Visualizar o novo Feedback";
  let structure = [];
  switch (service) {
    case "1":
      switch (mode) {
        case "1":
          structure.push("*" + header + "*");
          structure.push("ID: " + ID);
          if (message) {
            structure.push("Message: " + message);
          }
          return [{ url: '/api/telegram' }, { message: structure.join('\n').toString(), custom: 'MarkdownV2' }];
        case "2":
          structure.push("*" + header + "*");
          structure.push("ID: " + ID);
          if (message) {
            structure.push("Message: " + message);
          }
          structure.push("[" + urlMessage + "](" + url + ")");
          return [{ url: '/api/telegram' }, { message: structure.join('\n').toString(), custom: 'MarkdownV2' }];
        case "3":
          structure.push("<strong>" + header + "</strong>");
          structure.push("<b>ID:</b> " + ID);
          if (message) {
            structure.push("<b>Message:</b> " + message);
          }
          if (application) {
            structure.push("<b>Application:</b> " + application);
          }
          if (version) {
            structure.push("<b>Version:</b> " + version);
          }
          if (architecture) {
            structure.push("<b>Device:</b> Desktop");
            if (brandName) {
              structure.push("<b>Browser:</b> " + brandName);
            }
            if (brandVersion) {
              structure.push("<b>Browser version:</b> " + brandVersion);
            }
            if (systemName) {
              structure.push("<b>SystemName:</b> " + systemName);
            }
            if (systemVersion) {
              structure.push("<b>SystemVersion:</b> " + systemVersion);
            }
            structure.push("<b>Architecture:</b> " + architecture);
          } else {
            structure.push("<b>Device:</b> Mobile");
            if (brandName) {
              structure.push("<b>Brand:</b> " + brandName);
            }
            if (brandVersion) {
              structure.push("<b>Model:</b> " + brandVersion);
            }
            if (systemName) {
              structure.push("<b>SystemName:</b> " + systemName);
            }
            if (systemVersion) {
              structure.push("<b>SystemVersion:</b> " + systemVersion);
            }
          }
          structure.push("<a href='" + url + "'>" + urlMessage + "</a>");
          return [{ url: '/api/telegram' }, { message: structure.join('\n').toString(), custom: 'HTML' }];
      }
      break;
    case "2":
      switch (mode) {
        case "1":
          structure.push("**" + header + "**");
          structure.push("**ID:** " + ID);
          if (message) {
            structure.push("**Message:** " + message);
          }
          return [{ url: '/api/discord' }, { message: structure.join('\n').toString() }];
        case "2":
          structure.push("**" + header + "**");
          structure.push("**ID:** " + ID);
          if (message) {
            structure.push("**Message:** " + message);
          }
          return [{ url: '/api/discordembed' }, {
            message: structure.join('\n').toString(),
            content: {
              title: urlMessage,
              description: "",
              url: url,
              thumbnail: ""
            }
          }];
        case "3":
          structure.push("**" + header + "**");
          structure.push("**ID:** " + ID);
          if (message) {
            structure.push("**Message:** " + message);
          }
          if (application) {
            structure.push("**Application:** " + application);
          }
          if (version) {
            structure.push("**Version:** " + version);
          }
          if (architecture) {
            structure.push("**Device:** Desktop");
            if (brandName) {
              structure.push("**Browser:** " + brandName);
            }
            if (brandVersion) {
              structure.push("**Browser version:** " + brandVersion);
            }
            if (systemName) {
              structure.push("**SystemName:** " + systemName);
            }
            if (systemVersion) {
              structure.push("**SystemVersion:** " + systemVersion);
            }
            structure.push("**Architecture:** " + architecture);
          } else {
            structure.push("**Device:** Mobile");
            if (brandName) {
              structure.push("**Brand:** " + brandName);
            }
            if (brandVersion) {
              structure.push("**Model:** " + brandVersion);
            }
            if (systemName) {
              structure.push("**SystemName:** " + systemName);
            }
            if (systemVersion) {
              structure.push("**SystemVersion:** " + systemVersion);
            }
          }
          return [{ url: '/api/discordembed' }, {
            message: structure.join('\n').toString(),
            content: {
              title: urlMessage,
              description: "",
              url: url,
              thumbnail: ""
            }
          }];
      }
      break;
    case "3":
      switch (mode) {
        case "1":
          structure.push("*" + header + "*");
          structure.push("*ID:* " + ID);
          if (message) {
            structure.push("*Message:* " + message);
          }
          return [{ url: '/api/slackmarkdown' }, { message: structure.join('\n').toString() }];
        case "2":
          structure.push("*" + header + "*");
          structure.push("*ID:* " + ID);
          if (message) {
            structure.push("*Message:* " + message);
          }
          return [{ url: '/api/slackcard' }, {
            message: structure.join('\n').toString(),
            buttonText: urlMessage,
            buttonUrl: url
          }];
        case "3":
          structure.push({
            text: "*ID:*\n" + ID
          });
          if (message) {
            structure.push({
              text: "*Message:*\n" + message
            });
          }
          if (application) {
            structure.push({
              text: "*Application:*\n" + application
            });
          }
          if (version) {
            structure.push({
              text: "*Version:*\n" + version
            });
          }
          if (architecture) {
            structure.push({
              text: "*Device:*\n Desktop"
            });
            if (brandName) {
              structure.push({
                text: "*Browser:*\n" + brandName
              });
            }
            if (brandVersion) {
              structure.push({
                text: "*Browser version:*\n" + brandVersion
              });
            }
            if (systemName) {
              structure.push({
                text: "*SystemName:*\n" + systemName
              });
            }
            if (systemVersion) {
              structure.push({
                text: "*SystemVersion:*\n" + systemVersion
              });
            }
            structure.push({
              text: "*Architecture:*\n" + architecture
            });
          } else {
            structure.push({
              text: "*Device:*\n Mobile"
            });
            if (brandName) {
              structure.push({
                text: "*Brand:*\n" + brandName
              });
            }
            if (brandVersion) {
              structure.push({
                text: "*Model:*\n" + brandVersion
              });
            }
            if (systemName) {
              structure.push({
                text: "*SystemName:*\n" + systemName
              });
            }
            if (systemVersion) {
              structure.push({
                text: "*SystemVersion:*\n" + systemVersion
              });
            }
          }
          return [{ url: '/api/slackinformation' }, {
            header: header,
            informations: structure,
            footer: "<" + url + "|" + urlMessage + ">"
          }];
      }
      break;
    case "4":
      switch (mode) {
        case "1":
          structure.push("*" + header + "*");
          structure.push("*ID:* " + ID);
          if (message) {
            structure.push("*Message:* " + message);
          }
          return [{ url: '/api/gchat' }, { message: structure.join('\n').toString() }];
        case "2":
          structure.push("ID: " + ID);
          if (message) {
            structure.push("Message: " + message);
          }
          return [{ url: '/api/gchatcard' }, {
            title: header,
            subtitle: structure.join('\n').toString(),
            multiline: "true",
            label: "",
            icon: "DESCRIPTION",
            buttonText: urlMessage,
            buttonUrl: url
          }];
        case "3":
          structure.push({
            title: "ID",
            subtitle: ID
          });
          if (message) {
            structure.push({
              title: "Message",
              subtitle: message
            });
          }
          if (application) {
            structure.push({
              title: "Application",
              subtitle: application
            });
          }
          if (version) {
            structure.push({
              title: "Version",
              subtitle: version
            });
          }
          if (architecture) {
            structure.push({
              title: "Device",
              subtitle: "Desktop"
            });
            if (brandName) {
              structure.push({
                title: "Browser",
                subtitle: brandName
              });
            }
            if (brandVersion) {
              structure.push({
                title: "Browser version",
                subtitle: brandVersion
              });
            }
            if (systemName) {
              structure.push({
                title: "SystemName",
                subtitle: systemName
              });
            }
            if (systemVersion) {
              structure.push({
                title: "SystemVersion",
                subtitle: systemVersion
              });
            }
            structure.push({
              title: "Architecture",
              subtitle: architecture
            });
          } else {
            structure.push({
              title: "Device",
              subtitle: "Mobile"
            });
            if (brandName) {
              structure.push({
                text: "*Brand:*\n" + brandName
              });
            }
            if (brandVersion) {
              structure.push({
                title: "Model",
                subtitle: brandVersion
              });
            }
            if (systemName) {
              structure.push({
                title: "SystemName",
                subtitle: systemName
              });
            }
            if (systemVersion) {
              structure.push({
                title: "SystemVersion",
                subtitle: systemVersion
              });
            }
          }
          return [{ url: '/api/gchatinformation' }, {
            title: header,
            subtitle: "",
            informations: structure,
            buttons: [
              {
                text: urlMessage,
                url: url
              }
            ]
          }];
      }
      break;
  }
}

export { makerSender };