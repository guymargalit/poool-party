import styled from 'styled-components';

const Svg = styled.svg`
  display: block;
  fill: currentcolor;
`;

export const IconEmpty = (props) => <Svg {...props} viewBox="0 0 24 24"></Svg>;

export const IconPartyFace = () => (
  <svg viewBox="0 0 36 36">
    <circle fill="#FFCC4D" cx="17" cy="19" r="17" />
    <ellipse fill="#664500" cx="17.999" cy="26" rx="2" ry="2.5" />
    <path
      fill="#664500"
      d="M8.111 21.383c-.182 0-.367-.05-.532-.154-.467-.294-.607-.911-.313-1.379.916-1.453 3.701-3.938 7.69-2.962.536.131.864.673.733 1.209-.132.536-.676.862-1.209.733-3.604-.882-5.502 2.056-5.521 2.086-.191.302-.516.467-.848.467zm11.973-3.742c-.29 0-.576-.125-.774-.366-.35-.427-.288-1.058.14-1.408 3.176-2.604 6.762-1.562 8.215-.646.467.294.607.912.312 1.379-.293.465-.908.607-1.376.315-.138-.084-3.052-1.823-5.884.499-.186.153-.41.227-.633.227z"
    />
    <path
      fill="#E2A62D"
      d="M13.346 31.273c-.068 0-.137-.009-.205-.028-.398-.113-.63-.527-.517-.926.437-1.54.258-3.029-.49-4.086-.497-.702-1.205-1.131-1.943-1.178-.414-.025-.728-.382-.702-.795s.381-.751.795-.701c1.193.074 2.313.733 3.073 1.807 1.011 1.429 1.27 3.383.709 5.361-.093.331-.394.546-.72.546zm11.037-3.061c-.142 0-.285-.04-.412-.124-1.167-.77-1.82-2.117-1.792-3.695.029-1.635.809-3.153 1.984-3.869.353-.216.814-.104 1.03.251.216.354.104.814-.251 1.03-.735.448-1.244 1.499-1.264 2.614-.02 1.055.389 1.936 1.118 2.417.346.228.441.693.213 1.039-.144.219-.382.337-.626.337z"
    />
    <path
      fill="#DD2E44"
      d="M17.179 2.72c-.043-.049-.11-.076-.189-.091 0 0-15.924-3.023-16.613-2.415C-.311.823.74 16.998.74 16.998c.005.081.023.15.067.199.604.684 4.758-2.004 9.279-6.001 4.522-3.998 7.697-7.792 7.093-8.476z"
    />
    <path
      fill="#EA596E"
      d="M.349.271C.334.301.321.342.311.394.47 1.765 2.006 13.046 2.963 16.572c1.436-.803 2.895-1.894 4.609-3.253C6.116 10.654 1.158.146.349.271z"
    />
    <path
      fill="#3B88C3"
      d="M29.902 29.229l-10.573-1.303c-1.13-.102-3.117-.112-3.015-1.902.093-1.623 2.04-1.373 3.479-1.16l10.638 1.774-.529 2.591z"
    />
    <path
      fill="#88C9F9"
      d="M30.43 26.639l-4.222-.724c-.494-.089-.934.647-.956 1.426-.025.866.227 1.304.726 1.406l4.144.512.308-2.62z"
    />
    <path
      fill="#3B88C3"
      d="M34.918 26.341l-2.622 2.411-4.687-5.097 2.622-2.411c1.361-1.252 3.499-1.162 4.751.199l.135.147c1.251 1.362 1.162 3.499-.199 4.751z"
    />
    <ellipse
      transform="rotate(-42.597 29.954 26.205)"
      fill="#88C9F9"
      cx="29.952"
      cy="26.203"
      rx="2.77"
      ry="3.462"
    />
    <ellipse
      transform="rotate(-42.597 29.954 26.205)"
      fill="#269"
      cx="29.952"
      cy="26.203"
      rx="1.385"
      ry="2.077"
    />
    <circle fill="#55ACEE" cx="2.5" cy="33.5" r="1.5" />
    <circle fill="#55ACEE" cx="29" cy="2" r="2" />
    <path
      fill="#EA596E"
      d="M4.864 29.246L2.526 23.63.412 29.675zM26 5l-4 1 1-4z"
    />
    <path fill="#77B255" d="M31.999 13L36 7.999 33 6z" />
  </svg>
);

export const IconPopper = (props) => (
  <Svg {...props} viewBox="0 0 36 36">
    <path
      fill="#DD2E44"
      d="M11.626 7.488a1.413 1.413 0 0 0-.268.395l-.008-.008L.134 33.141l.011.011c-.208.403.14 1.223.853 1.937c.713.713 1.533 1.061 1.936.853l.01.01L28.21 24.735l-.008-.009c.147-.07.282-.155.395-.269c1.562-1.562-.971-6.627-5.656-11.313c-4.687-4.686-9.752-7.218-11.315-5.656z"
    />
    <path
      fill="#EA596E"
      d="M13 12L.416 32.506l-.282.635l.011.011c-.208.403.14 1.223.853 1.937c.232.232.473.408.709.557L17 17l-4-5z"
    />
    <path
      fill="#A0041E"
      d="M23.012 13.066c4.67 4.672 7.263 9.652 5.789 11.124c-1.473 1.474-6.453-1.118-11.126-5.788c-4.671-4.672-7.263-9.654-5.79-11.127c1.474-1.473 6.454 1.119 11.127 5.791z"
    />
    <path
      fill="#AA8DD8"
      d="M18.59 13.609a.99.99 0 0 1-.734.215c-.868-.094-1.598-.396-2.109-.873c-.541-.505-.808-1.183-.735-1.862c.128-1.192 1.324-2.286 3.363-2.066c.793.085 1.147-.17 1.159-.292c.014-.121-.277-.446-1.07-.532c-.868-.094-1.598-.396-2.11-.873c-.541-.505-.809-1.183-.735-1.862c.13-1.192 1.325-2.286 3.362-2.065c.578.062.883-.057 1.012-.134c.103-.063.144-.123.148-.158c.012-.121-.275-.446-1.07-.532a.998.998 0 0 1-.886-1.102a.997.997 0 0 1 1.101-.886c2.037.219 2.973 1.542 2.844 2.735c-.13 1.194-1.325 2.286-3.364 2.067c-.578-.063-.88.057-1.01.134c-.103.062-.145.123-.149.157c-.013.122.276.446 1.071.532c2.037.22 2.973 1.542 2.844 2.735c-.129 1.192-1.324 2.286-3.362 2.065c-.578-.062-.882.058-1.012.134c-.104.064-.144.124-.148.158c-.013.121.276.446 1.07.532a1 1 0 0 1 .52 1.773z"
    />
    <path
      fill="#77B255"
      d="M30.661 22.857c1.973-.557 3.334.323 3.658 1.478c.324 1.154-.378 2.615-2.35 3.17c-.77.216-1.001.584-.97.701c.034.118.425.312 1.193.095c1.972-.555 3.333.325 3.657 1.479c.326 1.155-.378 2.614-2.351 3.17c-.769.216-1.001.585-.967.702c.033.117.423.311 1.192.095a1 1 0 1 1 .54 1.925c-1.971.555-3.333-.323-3.659-1.479c-.324-1.154.379-2.613 2.353-3.169c.77-.217 1.001-.584.967-.702c-.032-.117-.422-.312-1.19-.096c-1.974.556-3.334-.322-3.659-1.479c-.325-1.154.378-2.613 2.351-3.17c.768-.215.999-.585.967-.701c-.034-.118-.423-.312-1.192-.096a1 1 0 1 1-.54-1.923z"
    />
    <path
      fill="#AA8DD8"
      d="M23.001 20.16a1.001 1.001 0 0 1-.626-1.781c.218-.175 5.418-4.259 12.767-3.208a1 1 0 1 1-.283 1.979c-6.493-.922-11.187 2.754-11.233 2.791a.999.999 0 0 1-.625.219z"
    />
    <path
      fill="#77B255"
      d="M5.754 16a1 1 0 0 1-.958-1.287c1.133-3.773 2.16-9.794.898-11.364c-.141-.178-.354-.353-.842-.316c-.938.072-.849 2.051-.848 2.071a1 1 0 1 1-1.994.149c-.103-1.379.326-4.035 2.692-4.214c1.056-.08 1.933.287 2.552 1.057c2.371 2.951-.036 11.506-.542 13.192a1 1 0 0 1-.958.712z"
    />
    <circle fill="#5C913B" cx="25.5" cy="9.5" r="1.5" />
    <circle fill="#9266CC" cx="2" cy="18" r="2" />
    <circle fill="#5C913B" cx="32.5" cy="19.5" r="1.5" />
    <circle fill="#5C913B" cx="23.5" cy="31.5" r="1.5" />
    <circle fill="#FFCC4D" cx="28" cy="4" r="2" />
    <circle fill="#FFCC4D" cx="32.5" cy="8.5" r="1.5" />
    <circle fill="#FFCC4D" cx="29.5" cy="12.5" r="1.5" />
    <circle fill="#FFCC4D" cx="7.5" cy="23.5" r="1.5" />
  </Svg>
);

export const IconClose = (props) => (
  <Svg {...props} viewBox="0 0 24 24">
    <path d="M5.287 5.305a1 1 0 0 1 1.414 0l5.293 5.293 5.293-5.293a1 1 0 0 1 1.438 1.39l-.024.024-5.293 5.293 5.293 5.293a1 1 0 0 1-1.414 1.414l-5.293-5.293L6.7 18.72a1 1 0 0 1-1.414-1.414l5.293-5.293L5.287 6.72a1 1 0 0 1 0-1.414z"></path>
  </Svg>
);

export const IconLeftChevron = (props) => (
  <Svg {...props} viewBox="0 0 24 24">
    <path d="M16.207 4.299a1 1 0 0 1 0 1.414l-6.293 6.293 6.293 6.293a1 1 0 0 1-1.414 1.414l-7-7a1 1 0 0 1 0-1.414l7-7a1 1 0 0 1 1.414 0z"></path>
  </Svg>
);

export const IconRightChevron = (props) => (
  <Svg {...props} viewBox="0 0 24 24">
    <path d="m4.29 1.71a1 1 0 1 1 1.42-1.41l8 8a1 1 0 0 1 0 1.41l-8 8a1 1 0 1 1 -1.42-1.41l7.29-7.29z"></path>
  </Svg>
);

export const IconDashboard = (props) => (
  <Svg {...props}>
    <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm0 16H5V9h14z"></path>
  </Svg>
);

export const IconPools = (props) => (
  <Svg {...props}>
    <path d="M12.143 4.286a1.143 1.143 0 0 0 0-2.286 1.143 1.143 0 0 0 0 2.286zM17 6.5A1.5 1.5 0 1 1 15.5 5 1.5 1.5 0 0 1 17 6.5zM10 10a2 2 0 1 0-2-2 2 2 0 0 0 2 2zm-7 3.982a.62.62 0 0 1 .758-.55 3.88 3.88 0 0 0 .742.068 3.285 3.285 0 0 0 1.605-.373 3.454 3.454 0 0 0 .959-.798c.08-.091.159-.187.23-.273l.085-.102a3.13 3.13 0 0 1 .252-.276A.51.51 0 0 1 8 11.5a.731.731 0 0 1 .496.2 3.123 3.123 0 0 1 .29.278c.032.032.064.067.099.104.08.085.17.18.261.272a3.828 3.828 0 0 0 1.077.785A4.07 4.07 0 0 0 12 13.5a4.088 4.088 0 0 0 1.777-.36 3.812 3.812 0 0 0 1.077-.786c.09-.091.18-.187.262-.273l.097-.103a3.392 3.392 0 0 1 .291-.278.731.731 0 0 1 .496-.2.513.513 0 0 1 .37.178 3.068 3.068 0 0 1 .251.275l.085.103c.071.086.15.182.23.273a3.471 3.471 0 0 0 .959.798 3.299 3.299 0 0 0 1.605.373 3.872 3.872 0 0 0 .742-.068.62.62 0 0 1 .758.55V18a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4z"></path>
  </Svg>
);

export const IconProfile = (props) => (
  <Svg {...props} viewBox="0 0 32 32">
    <path d="m16 1c8.2842712 0 15 6.71572875 15 15 0 8.2842712-6.7157288 15-15 15-8.28427125 0-15-6.7157288-15-15 0-8.28427125 6.71572875-15 15-15zm0 8c-2.7614237 0-5 2.2385763-5 5 0 2.0143973 1.2022141 3.7998876 2.9996346 4.5835001l.0003231 2.0984999-.1499943.0278452c-2.8326474.5613112-5.31897338 2.2230336-6.93575953 4.5872979 2.34343054 2.291067 5.54974273 3.7028569 9.08579613 3.7028569 3.5355506 0 6.7414538-1.4113884 9.0850203-3.701476-1.6141801-2.3628535-4.0978119-4.0247647-6.929184-4.5867938l-.1558786-.0287302.001228-2.0991413c1.7288399-.7547474 2.9066959-2.4357565 2.9936498-4.355479l.0051645-.2283797c0-2.7614237-2.2385763-5-5-5zm0-6c-7.17970175 0-13 5.82029825-13 13 0 2.9045768.95257276 5.5866683 2.56235849 7.7509147 1.42074739-1.9134907 3.33951478-3.4002416 5.53860831-4.2955956l.3480332-.1363191-.0229565-.0189706c-1.43704227-1.2411241-2.34462949-3.045583-2.42083359-5.0285539l-.00520991-.2714755c0-3.8659932 3.1340068-7 7-7s7 3.1340068 7 7c0 1.9941317-.8415062 3.8279876-2.224566 5.1193683l-.225434.2006317.0447787.0163138c2.3268368.8792152 4.3570558 2.4138611 5.8430586 4.4127726 1.6098837-2.1632453 2.5621627-4.8449575 2.5621627-7.7490864 0-7.17970175-5.8202983-13-13-13z"></path>
  </Svg>
);

export const IconSettings = (props) => (
  <Svg {...props} viewBox="0 0 24 24">
    <path d="M21.674 14.08l-1.327-.937a1.384 1.384 0 0 1-.001-2.284l1.326-.938a.752.752 0 0 0 .29-.847 9.96 9.96 0 0 0-2.355-3.89.825.825 0 0 0-.907-.178l-1.497.63a1.492 1.492 0 0 1-.59.12 1.456 1.456 0 0 1-1.468-1.264l-.182-1.566a.781.781 0 0 0-.622-.665 11.76 11.76 0 0 0-2.33-.26V2a11.894 11.894 0 0 0-2.351.259.781.781 0 0 0-.622.666L8.856 4.49a1.42 1.42 0 0 1-.729 1.072 1.52 1.52 0 0 1-1.333.074l-1.496-.63a.825.825 0 0 0-.907.178 9.96 9.96 0 0 0-2.355 3.889.752.752 0 0 0 .29.848l1.328.938a1.382 1.382 0 0 1 0 2.282l-1.328.94a.752.752 0 0 0-.29.847A9.963 9.963 0 0 0 4.39 18.82a.825.825 0 0 0 .906.18l1.503-.631a1.53 1.53 0 0 1 1.327.07 1.416 1.416 0 0 1 .73 1.069l.18 1.563a.78.78 0 0 0 .61.664 10.593 10.593 0 0 0 4.707 0 .78.78 0 0 0 .611-.664l.18-1.566a1.415 1.415 0 0 1 .728-1.071 1.53 1.53 0 0 1 1.329-.07l1.503.632a.825.825 0 0 0 .906-.18 9.965 9.965 0 0 0 2.354-3.888.752.752 0 0 0-.29-.848zM12 15a3 3 0 1 1 3-3 3 3 0 0 1-3 3z"></path>
  </Svg>
);

export const IconPlus = (props) => (
  <Svg {...props} viewBox="0 0 24 24">
    <path d="M12 3a1 1 0 0 0-1 1v7H4a1 1 0 0 0 0 2h7v7a1 1 0 0 0 2 0v-7h7a1 1 0 0 0 0-2h-7V4a1 1 0 0 0-1-1z"></path>
  </Svg>
);

export const IconAdd = (props) => (
  <Svg {...props} viewBox="0 0 24 24">
    <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm4 11h-3v3a1 1 0 0 1-2 0v-3H8a1 1 0 0 1 0-2h3V8a1 1 0 0 1 2 0v3h3a1 1 0 0 1 0 2z"></path>
  </Svg>
);

export const IconSearch = (props) => (
  <Svg {...props} viewBox="0 0 24 24">
    <path d="M19 10.5a8.5 8.5 0 1 0-8.5 8.5 8.5 8.5 0 0 0 8.5-8.5zm-15 0a6.5 6.5 0 1 1 6.5 6.5A6.509 6.509 0 0 1 4 10.5zm14.558 5.915c-.14-.14-.733.227-1.324.818-.591.592-.958 1.184-.818 1.324l2.998 3a1.515 1.515 0 1 0 2.142-2.143z"></path>
  </Svg>
);

export const IconWarning = (props) => (
  <Svg {...props} viewBox="0 0 16 16">
    <path d="M10.115 1.308l5.635 11.269A2.365 2.365 0 0 1 13.634 16H2.365A2.365 2.365 0 0 1 .25 12.577L5.884 1.308a2.365 2.365 0 0 1 4.231 0zM8 10.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM8 9c.552 0 1-.32 1-.714V4.714C9 4.32 8.552 4 8 4s-1 .32-1 .714v3.572C7 8.68 7.448 9 8 9z"></path>
  </Svg>
);

export const IconShare = (props) => (
  <Svg {...props} viewBox="0 0 24 24">
    <path d="M17.707 8.707a1 1 0 0 0 0-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L11 5.414v8.589a1 1 0 0 0 2 0v-8.59l3.293 3.294a1 1 0 0 0 1.414 0z"></path>
    <path d="M5 15a1 1 0 0 0-2 0v3a4 4 0 0 0 4 4h10a4 4 0 0 0 4-4v-3a1 1 0 0 0-2 0v3a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2z"></path>
  </Svg>
);

export const IconCamera = (props) => (
  <Svg {...props} viewBox="0 0 24 24">
    <path d="M19 6h-.763a3 3 0 0 1-2.426-1.235l-.385-.53A3 3 0 0 0 13 3h-2.181a3 3 0 0 0-2.427 1.235l-.684.941A2 2 0 0 1 6.091 6H5a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3zm-7 12a5 5 0 1 1 5-5 5 5 0 0 1-5 5zm3-5a3 3 0 1 1-3-3 3 3 0 0 1 3 3z"></path>
  </Svg>
);

export const IconLogout = (props) => (
  <Svg {...props} viewBox="0 0 24 24">
    <path d="M15.293 17.707a1 1 0 0 0 1.414 0l5-5a1 1 0 0 0 0-1.414l-5-5a1 1 0 1 0-1.438 1.39l.024.024L18.586 11H9.997a1 1 0 0 0 0 2h8.59l-3.294 3.293a1 1 0 0 0 0 1.414z"></path>
    <path d="M9 5a1 1 0 0 0 0-2H6a4 4 0 0 0-4 4v10a4 4 0 0 0 4 4h3a1 1 0 0 0 0-2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z"></path>
  </Svg>
);

export const IconCheckmark = (props) => (
  <Svg {...props} viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="9" fill="#fff" />
    <path
      fillRule="evenodd"
      d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm5.237-12.324a1 1 0 0 0-1.474-1.352l-4.794 5.23-2.262-2.261a1 1 0 0 0-1.414 1.414l3 3a1 1 0 0 0 1.444-.031l5.5-6z"
    ></path>
  </Svg>
);

export const IconVenmo = (props) => (
  <Svg {...props} viewBox="0 0 20 20">
    <path d="M17.8403 0.77C18.5249 1.87835 18.8338 3.01961 18.8338 4.46184C18.8338 9.06059 14.8274 15.0349 11.5754 19.23H4.14835L1.17 1.77723L7.67325 1.17209L9.2479 13.5911C10.7198 11.242 12.5352 7.55014 12.5352 5.03327C12.5352 3.65605 12.2945 2.71704 11.9181 1.94497L17.8403 0.77Z"></path>
  </Svg>
);

export const IconLock = (props) => (
  <Svg {...props} viewBox="0 0 24 24">
    <path d="M19.392 10.281l-1.138-.324A.575.575 0 0 1 18 9.5v-1C18 4.818 15.534 2 12 2S6 4.818 6 8.5v1a.575.575 0 0 1-.254.457l-1.138.324A.78.78 0 0 0 4 11v8a3.226 3.226 0 0 0 3 3h10a3.226 3.226 0 0 0 3-3v-8a.78.78 0 0 0-.608-.719zM14 16.602A1.558 1.558 0 0 1 12.322 18h-.644A1.557 1.557 0 0 1 10 16.602v-2.204A1.557 1.557 0 0 1 11.678 13h.644A1.558 1.558 0 0 1 14 14.398zm2-7.213v.001a20.777 20.777 0 0 0-8 0v-.852A4.3 4.3 0 0 1 12 4a4.3 4.3 0 0 1 4 4.537z"></path>
  </Svg>
);

export const IconUnlock = (props) => (
  <Svg {...props} viewBox="0 0 24 24">
    <path d="M19.392 10.281l-1.77-.503A20.725 20.725 0 0 0 8 9.389V8c0-2.63 1.266-4 4-4 2.365 0 3.63 1.025 3.93 3.003A1.126 1.126 0 0 0 17 8a.896.896 0 0 0 .927-.997A5.776 5.776 0 0 0 12 2a5.941 5.941 0 0 0-6 6.154v1.731l-1.392.396A.78.78 0 0 0 4 11v8a3.226 3.226 0 0 0 3 3h10a3.226 3.226 0 0 0 3-3v-8a.78.78 0 0 0-.608-.719zM14 16.602A1.557 1.557 0 0 1 12.322 18h-.644A1.557 1.557 0 0 1 10 16.602v-2.204a1.263 1.263 0 0 1 .392-.898h3.216a1.263 1.263 0 0 1 .392.898z"></path>
  </Svg>
);

export const IconVenmoLogo = (props) => (
  <Svg {...props} viewBox="0 0 211 41">
    <path
      d="M34.5771 0.822021C35.9974 3.16733 36.6377 5.58301 36.6377 8.63451C36.6377 18.3672 28.3277 31.0107 21.5832 39.8888H6.17825L0 2.95296L13.4887 1.67258L16.7552 27.9548C19.8074 22.9834 23.5738 15.171 23.5738 9.84453C23.5738 6.92902 23.0743 4.94318 22.2935 3.30806L34.5771 0.822021Z"
      fill="#FFFFFF"
    />
    <path
      d="M52.0595 17.0887C54.5417 17.0887 60.7907 15.9534 60.7907 12.4024C60.7907 10.6973 59.5848 9.84676 58.1637 9.84676C55.6776 9.84676 52.415 12.8275 52.0595 17.0887ZM51.7751 24.1214C51.7751 28.4573 54.1865 30.1584 57.3834 30.1584C60.8647 30.1584 64.1979 29.3078 68.5303 27.1065L66.8985 38.1852C63.846 39.6763 59.0888 40.6713 54.4713 40.6713C42.7584 40.6713 38.5664 33.5693 38.5664 24.6908C38.5664 13.1834 45.3853 0.9646 59.4436 0.9646C67.1837 0.9646 71.5117 5.30013 71.5117 11.3371C71.5124 21.0695 59.0188 24.051 51.7751 24.1214Z"
      fill="#FFFFFF"
    />
    <path
      d="M110.439 9.34835C110.439 10.7687 110.224 12.8289 110.009 14.1753L105.962 39.7474H92.8275L96.5196 16.3059C96.5896 15.6701 96.8048 14.3901 96.8048 13.6799C96.8048 11.9747 95.7393 11.5493 94.4583 11.5493C92.7568 11.5493 91.0513 12.3298 89.9155 12.8997L85.7278 39.7477H72.5195L78.5537 1.46185H89.9855L90.1302 4.51773C92.8272 2.74224 96.3785 0.822022 101.417 0.822022C108.093 0.821292 110.439 4.2319 110.439 9.34835Z"
      fill="#FFFFFF"
    />
    <path
      d="M149.432 5.15577C153.194 2.45936 156.746 0.9646 161.643 0.9646C168.387 0.9646 170.733 4.37521 170.733 9.49167C170.733 10.9121 170.518 12.9723 170.304 14.3187L166.261 39.8907H153.123L156.886 15.9538C156.955 15.3139 157.101 14.5334 157.101 14.0383C157.101 12.1184 156.035 11.6926 154.754 11.6926C153.123 11.6926 151.492 12.4028 150.281 13.043L146.094 39.8911H132.96L136.722 15.9541C136.791 15.3143 136.933 14.5338 136.933 14.0387C136.933 12.1188 135.866 11.693 134.59 11.693C132.885 11.693 131.183 12.4735 130.047 13.0434L125.856 39.8915H112.652L118.686 1.60552H129.978L130.333 4.80176C132.96 2.88628 136.508 0.966057 141.265 0.966057C145.384 0.964599 148.08 2.74045 149.432 5.15577Z"
      fill="#FFFFFF"
    />
    <path
      d="M196.869 16.3076C196.869 13.1821 196.087 11.0512 193.746 11.0512C188.563 11.0512 187.498 20.2133 187.498 24.9003C187.498 28.456 188.493 30.6566 190.834 30.6566C195.733 30.6566 196.869 20.9942 196.869 16.3076ZM174.15 24.3345C174.15 12.2608 180.539 0.963379 195.238 0.963379C206.314 0.963379 210.363 7.49985 210.363 16.522C210.363 28.4556 204.043 40.814 188.989 40.814C177.842 40.814 174.15 33.497 174.15 24.3345Z"
      fill="#FFFFFF"
    />
  </Svg>
);

export const IconSun = (props) => (
  <Svg viewBox="0 0 36 36">
    <path
      fill="#F4900C"
      d="M18 35.8c-.39 0-.745-.218-.921-.565l-1.8-3.554-3.024 2.596c-.191.161-.43.247-.672.247-.133 0-.267-.025-.394-.078-.359-.148-.606-.487-.634-.873l-.304-3.976-3.788 1.241c-.105.034-.213.051-.321.051-.27 0-.532-.106-.73-.303-.274-.273-.371-.681-.25-1.051l1.24-3.788-3.972-.301c-.387-.031-.726-.275-.875-.634-.148-.361-.083-.772.17-1.067l2.594-3.024-3.554-1.8C.418 18.745.2 18.388.2 18s.218-.745.565-.921l3.554-1.8-2.594-3.024c-.252-.295-.318-.708-.17-1.066.149-.359.487-.606.875-.634l3.972-.304-1.24-3.788c-.121-.37-.024-.775.25-1.051.198-.196.46-.301.73-.301.108 0 .216.017.321.051l3.788 1.24.304-3.972c.029-.388.275-.726.634-.875.127-.052.261-.078.394-.078.242 0 .481.084.672.248l3.024 2.594 1.8-3.554C17.255.418 17.61.2 18 .2c.388 0 .745.218.92.565l1.802 3.554 3.024-2.594c.19-.164.431-.248.671-.248.135 0 .268.026.396.078.358.149.603.487.634.875l.303 3.972 3.785-1.24c.105-.035.215-.051.321-.051.27 0 .534.105.729.301.276.276.373.682.252 1.051l-1.241 3.788 3.976.304c.386.029.725.275.873.634.148.358.084.771-.169 1.066l-2.596 3.024 3.554 1.8c.348.177.566.533.566.921s-.218.744-.565.921l-3.554 1.8 2.596 3.024c.253.295.317.706.169 1.067-.148.358-.487.603-.876.634l-3.973.301 1.241 3.788c.121.371.024.777-.252 1.051-.195.197-.46.303-.729.303-.106 0-.216-.017-.321-.051l-3.785-1.241-.303 3.973c-.031.389-.275.728-.634.876-.129.053-.262.078-.396.078-.24 0-.48-.086-.671-.247l-3.024-2.596-1.802 3.554c-.176.347-.533.565-.921.565z"
    />
    <path
      fill="#FFCC4D"
      d="M31 18c0 7.179-5.821 13-13 13S5 25.18 5 18 10.821 5 18 5s13 5.821 13 13"
    />
    <path
      d="M18 23.471c-6.222 0-8-2.328-8-1.228 0 1.102 3.556 3.98 8 3.98s8-2.879 8-3.98c0-1.1-1.777 1.228-8 1.228m8-8.804c0 1.473-1.194 2.667-2.667 2.667-1.472 0-2.666-1.194-2.666-2.667S21.861 12 23.333 12C24.806 12 26 13.193 26 14.667m-10.667 0c0 1.473-1.195 2.667-2.667 2.667-1.472 0-2.667-1.194-2.667-2.667S11.195 12 12.667 12c1.472 0 2.666 1.193 2.666 2.667"
      fill="#F4900C"
    />
  </Svg>
);

export const IconMoon = (props) => (
  <Svg viewBox="0 0 36 36">
    <path
      fill="#FFD983"
      d="M36 18c0 9.941-8.059 18-18 18S0 27.941 0 18 8.059 0 18 0s18 8.059 18 18"
    />
    <g fill="#FFCC4D">
      <circle cx="9.5" cy="7.5" r="3.5" />
      <circle cx="24.5" cy="28.5" r="3.5" />
      <circle cx="22" cy="5" r="2" />
      <circle cx="3" cy="18" r="1" />
      <circle cx="30" cy="9" r="1" />
      <circle cx="16" cy="31" r="1" />
      <circle cx="32" cy="19" r="2" />
      <circle cx="6" cy="26" r="2" />
    </g>
    <path
      d="M18 24.904c-7 0-9-2.618-9-1.381C9 24.762 13 28 18 28s9-3.238 9-4.477c0-1.237-2 1.381-9 1.381M27 15c0 1.657-1.344 3-3 3s-3-1.343-3-3 1.344-3 3-3 3 1.343 3 3m-12 0c0 1.657-1.344 3-3 3s-3-1.343-3-3 1.344-3 3-3 3 1.343 3 3"
      fill="#292F33"
    />
  </Svg>
);
