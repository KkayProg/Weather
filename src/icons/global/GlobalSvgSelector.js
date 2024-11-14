export const GlobalSvgSelector = ({id, width=95, height=95}) => {

    switch (id) {
        case 'sun':
            return(<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width={width} height={height}>
                <circle cx="32" cy="32" r="12" fill="#FFD700" />
                <path d="M32 2v12M32 62v-12M2 32h12M62 32h-12M8.5 8.5l9 9M55.5 8.5l-9 9M8.5 55.5l9-9M55.5 55.5l-9-9" 
                      stroke="#FFD700" strokeWidth="4" strokeLinecap="round" fill="none" />
              </svg>
              )
    
        default:
            return null;
    }
}