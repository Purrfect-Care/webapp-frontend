import React, {useEffect} from "react";
import "./Home.css";
import {useNavigate} from 'react-router-dom';

const Home = () => {
  const logo = document.querySelectorAll("#logo path");

  for (let i = 0; i < logo.length; i++) {
    console.log(`Letter ${i} is ${logo[i].getTotalLength()}`);
  }

  const navigate = useNavigate();

  useEffect(() => {
    // Navigate to the "/other" route after a 2-second delay
    const timeout = setTimeout(() => {
      navigate('/login');
    }, 5000);

    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <div className="home">
      <h2 className="welcome">Welcome to</h2>
      <svg
      id="logo"
        width="838"
        height="121"
        viewBox="0 0 838 121"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M782.201 109.42L782.207 109.423L782.214 109.427C787.915 112.898 794.636 114.591 802.295 114.591C807.671 114.591 812.576 113.764 816.982 112.072L816.995 112.067C821.374 110.35 825.101 107.947 828.136 104.841L828.144 104.833C831.177 101.693 833.344 98.0397 834.631 93.894L835.24 91.9311L833.261 91.3756L821.926 88.1938L820.158 87.6974L819.513 89.4171C818.611 91.822 817.355 93.7845 815.765 95.3476C814.162 96.8909 812.244 98.0677 809.984 98.8715C807.744 99.6472 805.188 100.051 802.295 100.051C797.855 100.051 794.051 99.0921 790.818 97.2378C787.601 95.36 785.062 92.629 783.202 88.9736C781.795 86.133 780.904 82.7523 780.575 78.7955H833.914H835.914V76.7955V71.8239C835.914 64.5347 834.95 58.2736 832.945 53.1037C830.969 48.0076 828.281 43.8244 824.837 40.6308C821.463 37.4686 817.693 35.161 813.531 33.7383L812.887 35.6236L813.531 33.7383C809.452 32.3435 805.306 31.6421 801.102 31.6421C793.866 31.6421 787.444 33.4213 781.912 37.0383C776.443 40.6024 772.199 45.5676 769.171 51.8666L769.169 51.8708C766.169 58.1508 764.698 65.3486 764.698 73.4148C764.698 81.4803 766.168 88.6487 769.173 94.8673L769.173 94.8673L769.179 94.8794C772.22 101.066 776.563 105.931 782.201 109.42ZM819.914 64.6534H780.708C781.081 62.1542 781.831 59.7719 782.958 57.4988C784.628 54.1278 786.999 51.4104 790.092 49.3185L790.095 49.3161C793.135 47.2504 796.774 46.1819 801.102 46.1819C805.027 46.1819 808.325 47.0827 811.075 48.8091L811.083 48.8141C813.911 50.5704 816.08 52.9571 817.608 56.0138L817.612 56.0208L817.615 56.0277C818.913 58.5741 819.689 61.4404 819.914 64.6534Z"
          stroke="white"
          strokeWidth="4"
        />
        <path
          d="M718.512 111V113H720.512H732.245H734.245V111V62.6763C734.245 59.5661 734.988 56.8716 736.431 54.5323C737.93 52.1225 739.951 50.2452 742.526 48.8833L742.526 48.8833L742.534 48.8794C745.127 47.4947 748.11 46.7786 751.535 46.7786C752.994 46.7786 754.358 46.8872 755.631 47.0994L755.657 47.1037L755.683 47.1074C757.138 47.3104 757.935 47.4459 758.209 47.5143L760.694 48.1356V45.574V33.6422V31.8323L758.893 31.6522C758.154 31.5783 757.117 31.5272 755.812 31.4937C754.51 31.4603 753.414 31.4434 752.529 31.4434C747.592 31.4434 743.102 32.7194 739.115 35.2928L740.182 36.9459L739.115 35.2928C737.037 36.6341 735.276 38.2019 733.847 39.9944V34.6365V32.6365H731.847H720.512H718.512V34.6365V111Z"
          stroke="white"
          strokeWidth="4"
        />
        <path
          d="M650.071 111.865L650.083 111.871C654.319 113.829 659.001 114.79 664.097 114.79C668.726 114.79 672.774 114.1 676.173 112.638C679.432 111.236 682.137 109.497 684.217 107.38C684.619 106.971 685.002 106.562 685.364 106.155V111V113H687.364H699.097H701.097V111V60.6875C701.097 54.4325 700.076 49.2209 697.866 45.206C695.737 41.3379 693.003 38.3511 689.632 36.3495C686.457 34.4453 683.134 33.1781 679.667 32.5691C676.404 31.9579 673.464 31.6421 670.858 31.6421C666.83 31.6421 662.747 32.1977 658.616 33.2991C654.398 34.3986 650.508 36.3477 646.957 39.1257C643.328 41.9563 640.49 45.8644 638.395 50.752L637.557 52.7077L639.561 53.4233L650.697 57.4006L652.415 58.0143L653.184 56.3593C654.306 53.9424 656.299 51.561 659.302 49.246C662.02 47.1515 665.926 45.983 671.256 45.983C676.35 45.983 679.766 47.263 681.905 49.4563L681.905 49.4564L681.914 49.4652C684.132 51.7106 685.364 54.9591 685.364 59.4944V59.8921C685.364 61.2397 684.931 61.7975 684.347 62.1251L684.338 62.1303L684.329 62.1355C683.371 62.6864 681.589 63.1979 678.746 63.5217C675.841 63.8224 672.064 64.2717 667.421 64.8686L667.417 64.8692C663.811 65.341 660.223 65.9811 656.652 66.7894C653.008 67.5882 649.65 68.8092 646.591 70.462C643.408 72.1816 640.848 74.5736 638.939 77.6183C636.954 80.7514 636.046 84.704 636.046 89.3239C636.046 94.6152 637.284 99.2576 639.857 103.153L639.862 103.161C642.393 106.957 645.812 109.861 650.071 111.865ZM676.633 97.7759L676.625 97.7803C673.817 99.3896 670.269 100.25 665.887 100.25C661.51 100.25 658.07 99.2907 655.431 97.5162C653.028 95.848 651.779 93.4213 651.779 89.9205C651.779 87.2993 652.47 85.4801 653.634 84.2185C654.994 82.747 656.809 81.6049 659.154 80.833L659.161 80.8307L659.168 80.8283C661.685 79.979 664.406 79.36 667.339 78.9776L667.341 78.9773C668.585 78.8136 670.213 78.6161 672.23 78.3847L672.244 78.3831L672.258 78.3813C674.33 78.114 676.45 77.8134 678.62 77.4796L678.632 77.4777L678.645 77.4757C680.884 77.1024 682.879 76.6739 684.622 76.1859L684.635 76.1824L684.647 76.1787C684.893 76.1063 685.133 76.0316 685.364 75.9544V83.358C685.364 86.174 684.635 88.8648 683.144 91.4594L683.14 91.467L683.136 91.4745C681.71 94.0053 679.57 96.1108 676.633 97.7759Z"
          stroke="white"
          strokeWidth="4"
        />
        <path
          d="M538.882 34.9492L538.88 34.9534C534.941 43.3053 533 52.8817 533 63.6347C533 74.2074 534.896 83.6868 538.74 92.0302C542.588 100.382 548.115 106.99 555.325 111.792C562.582 116.624 571.184 119 581.043 119C588.794 119 595.682 117.536 601.653 114.543L601.659 114.54C607.616 111.53 612.439 107.46 616.08 102.325C619.754 97.1624 622.053 91.3585 622.979 84.9432L623.309 82.6574H621H605.388H603.837L603.451 84.1593C602.548 87.6688 601.047 90.6226 598.969 93.0641C596.877 95.5223 594.327 97.4067 591.294 98.7249C588.267 100.04 584.861 100.715 581.043 100.715C575.246 100.715 570.283 99.184 566.069 96.1725C561.867 93.1387 558.553 88.8487 556.161 83.2087C553.816 77.5759 552.612 70.8873 552.612 63.0957C552.612 55.4919 553.835 48.9696 556.216 43.479C558.649 37.9254 561.983 33.7215 566.183 30.7729L566.186 30.7705C570.407 27.7944 575.333 26.2846 581.043 26.2846C587.558 26.2846 592.503 28.0205 596.105 31.2906L596.113 31.2983L596.122 31.306C599.963 34.7131 602.368 38.5532 603.449 42.8321L603.83 44.3426H605.388H621H623.291L622.982 42.0723C622.057 35.2905 619.665 29.303 615.783 24.1581C611.918 19.0362 606.961 15.0602 600.946 12.2328C594.915 9.39737 588.179 8 580.778 8C571.256 8 562.835 10.3837 555.591 15.2073C548.426 19.9632 542.86 26.5666 538.882 34.9492Z"
          stroke="white"
          strokeWidth="4"
        />
        <path
          d="M524.121 34.6363V32.6363H522.121H507.814V16.3408V14.3408H505.814H494.081H492.081V16.3408V32.6363H482.547H480.547V34.6363V44.5795V46.5795H482.547H492.081V92.3067C492.081 97.0586 493.183 101.167 495.528 104.496L495.533 104.502L495.537 104.508C497.822 107.699 500.712 110.103 504.194 111.679L504.201 111.682C507.626 113.216 511.152 113.994 514.763 113.994C517.025 113.994 518.99 113.825 520.613 113.45C522.068 113.145 523.285 112.824 524.215 112.475L525.849 111.862L525.463 110.161L523.077 99.6208L522.646 97.7188L520.734 98.1012L518.786 98.491C518.104 98.597 517.171 98.659 515.956 98.659C514.451 98.659 513.037 98.4296 511.704 97.979C510.685 97.5963 509.767 96.846 508.974 95.5591C508.282 94.3525 507.814 92.2941 507.814 89.1249V46.5795H522.121H524.121V44.5795V34.6363Z"
          stroke="white"
          strokeWidth="4"
        />
        <path
          d="M409.603 51.8129L409.601 51.8172C406.599 58.0643 405.128 65.2135 405.128 73.2159C405.128 81.0851 406.566 88.1607 409.493 94.3994C412.425 100.647 416.641 105.598 422.141 109.194C427.686 112.819 434.245 114.591 441.73 114.591C447.613 114.591 452.864 113.5 457.429 111.253L457.434 111.25C461.976 108.997 465.667 105.943 468.457 102.08C471.268 98.2007 473.029 93.837 473.737 89.0183L474.074 86.7273H471.758H460.026H458.482L458.091 88.2206C457.432 90.7363 456.34 92.8407 454.835 94.5765C453.316 96.3295 451.462 97.6759 449.248 98.6207C447.04 99.5627 444.544 100.051 441.73 100.051C437.459 100.051 433.828 98.9451 430.752 96.7877C427.681 94.6096 425.247 91.5249 423.484 87.4432C421.756 83.3684 420.861 78.5095 420.861 72.8182C420.861 67.2678 421.77 62.534 423.522 58.5659C425.316 54.547 427.763 51.5247 430.834 49.4081L430.837 49.4058C433.919 47.2721 437.524 46.1819 441.73 46.1819C446.545 46.1819 450.136 47.4401 452.729 49.7516L452.737 49.7592L452.746 49.7667C455.567 52.2234 457.308 54.968 458.089 58.0038L458.475 59.5057H460.026H471.758H474.055L473.739 57.2306C473.032 52.1383 471.2 47.6316 468.224 43.7586C465.265 39.9092 461.473 36.9262 456.886 34.8091C452.282 32.6842 447.152 31.6421 441.531 31.6421C434.296 31.6421 427.874 33.4213 422.341 37.0383C416.875 40.6007 412.631 45.547 409.603 51.8129Z"
          stroke="white"
          strokeWidth="4"
        />
        <path
          d="M341.146 109.42L341.153 109.423L341.159 109.427C346.86 112.898 353.581 114.591 361.24 114.591C366.616 114.591 371.521 113.764 375.927 112.072L375.94 112.067C380.319 110.35 384.046 107.947 387.081 104.841L387.089 104.833C390.122 101.693 392.29 98.0397 393.576 93.894L394.185 91.9311L392.207 91.3756L380.871 88.1938L379.103 87.6974L378.458 89.4171C377.556 91.822 376.301 93.7845 374.711 95.3476C373.107 96.8909 371.189 98.0677 368.93 98.8715C366.689 99.6472 364.134 100.051 361.24 100.051C356.8 100.051 352.996 99.0921 349.763 97.2378C346.547 95.36 344.007 92.629 342.147 88.9736C340.74 86.133 339.85 82.7523 339.52 78.7955H392.859H394.859V76.7955V71.8239C394.859 64.5347 393.895 58.2736 391.89 53.1037C389.914 48.0076 387.226 43.8244 383.783 40.6308C380.409 37.4686 376.638 35.161 372.477 33.7383L371.832 35.6236L372.477 33.7383C368.397 32.3435 364.251 31.6421 360.047 31.6421C352.811 31.6421 346.39 33.4213 340.857 37.0383C335.388 40.6024 331.144 45.5676 328.116 51.8666L328.114 51.8708C325.114 58.1508 323.643 65.3486 323.643 73.4148C323.643 81.4804 325.114 88.6487 328.118 94.8673L328.118 94.8673L328.124 94.8794C331.165 101.066 335.508 105.931 341.146 109.42ZM378.859 64.6534H339.653C340.026 62.1542 340.777 59.7719 341.903 57.4988C343.573 54.1278 345.944 51.4104 349.037 49.3185L349.04 49.3161C352.08 47.2504 355.72 46.1819 360.047 46.1819C363.972 46.1819 367.27 47.0827 370.021 48.8091L370.029 48.8141C372.857 50.5704 375.025 52.9571 376.553 56.0138L376.557 56.0208L376.561 56.0277C377.859 58.5741 378.634 61.4404 378.859 64.6534Z"
          stroke="white"
          strokeWidth="4"
        />
        <path
          d="M317.924 34.6365V32.6365H315.924H300.822V26.8808C300.822 23.3718 301.609 21.0519 302.864 19.5952C304.055 18.2491 306.179 17.3467 309.759 17.3467C311.357 17.3467 312.505 17.4904 313.278 17.7148L313.286 17.7172L313.294 17.7194C314.344 18.0145 315.137 18.2531 315.689 18.4372L317.587 19.0697L318.219 17.1723L321.6 7.03027L322.174 5.30766L320.515 4.5702C319.462 4.10225 317.971 3.63843 316.119 3.16701C314.074 2.64632 311.538 2.40918 308.566 2.40918C304.645 2.40918 300.904 3.19529 297.363 4.76906C293.754 6.37317 290.801 8.79319 288.536 12.0073C286.195 15.3309 285.089 19.4039 285.089 24.0967V32.6365H274.759H272.759V34.6365V44.5796V46.5796H274.759H285.089V111V113H287.089H298.822H300.822V111V46.5796H315.924H317.924V44.5796V34.6365Z"
          stroke="white"
          strokeWidth="4"
        />
        <path
          d="M223.043 111V113H225.043H236.776H238.776V111V62.6763C238.776 59.5661 239.519 56.8716 240.962 54.5323C242.462 52.1225 244.482 50.2452 247.058 48.8833L247.058 48.8833L247.065 48.8794C249.658 47.4947 252.642 46.7786 256.066 46.7786C257.525 46.7786 258.889 46.8872 260.162 47.0994L260.188 47.1037L260.214 47.1074C261.669 47.3104 262.467 47.4459 262.74 47.5143L265.225 48.1356V45.574V33.6422V31.8323L263.424 31.6522C262.686 31.5783 261.648 31.5272 260.343 31.4937C259.041 31.4603 257.945 31.4434 257.06 31.4434C252.124 31.4434 247.633 32.7194 243.646 35.2928L244.713 36.9459L243.646 35.2928C241.568 36.6341 239.808 38.2019 238.379 39.9944V34.6365V32.6365H236.379H225.043H223.043V34.6365V111Z"
          stroke="white"
          strokeWidth="4"
        />
        <path
          d="M170.953 111V113H172.953H184.686H186.686V111V62.6763C186.686 59.5661 187.429 56.8716 188.872 54.5323C190.372 52.1225 192.392 50.2452 194.968 48.8833L194.968 48.8833L194.975 48.8794C197.568 47.4947 200.552 46.7786 203.976 46.7786C205.435 46.7786 206.799 46.8872 208.072 47.0994L208.098 47.1037L208.125 47.1074C209.58 47.3104 210.377 47.4459 210.65 47.5143L213.135 48.1356V45.574V33.6422V31.8323L211.334 31.6522C210.596 31.5783 209.559 31.5272 208.253 31.4937C206.951 31.4603 205.856 31.4434 204.971 31.4434C200.034 31.4434 195.543 32.7194 191.556 35.2928L192.623 36.9459L191.556 35.2928C189.478 36.6341 187.718 38.2019 186.289 39.9944V34.6365V32.6365H184.289H172.953H170.953V34.6365V111Z"
          stroke="white"
          strokeWidth="4"
        />
        <path
          d="M139.731 32.6362H137.731V34.6362V79.7783C137.731 84.2633 136.751 87.77 134.943 90.4393L134.939 90.4454L134.935 90.4515C133.058 93.2671 130.766 95.3032 128.064 96.6251L128.056 96.629C125.273 98.0051 122.608 98.659 120.043 98.659C115.681 98.659 112.209 97.1998 109.466 94.3138C106.776 91.4498 105.339 87.5406 105.339 82.3635V34.6362V32.6362H103.339H91.6058H89.6058V34.6362V83.159C89.6058 89.8579 90.6975 95.5725 92.996 100.205L92.9988 100.211C95.2765 104.767 98.4534 108.26 102.545 110.599L102.557 110.605C106.603 112.881 111.191 113.994 116.265 113.994C122.345 113.994 127.55 112.576 131.742 109.598L131.751 109.591C134.088 107.91 136.085 106.007 137.731 103.883V111V113H139.731H151.464H153.464V111V34.6362V32.6362H151.464H139.731Z"
          stroke="white"
          strokeWidth="4"
        />
        <path
          d="M2.32956 111V113H4.32956H16.6591H18.6591V111V75.8128H38.9318C47.0808 75.8128 53.9479 74.3315 59.4091 71.2261L59.4176 71.2212C64.8056 68.1222 68.84 63.9281 71.4474 58.6444C74.0501 53.4372 75.3352 47.6761 75.3352 41.398C75.3352 35.1183 74.0494 29.37 71.4427 24.1919C68.7983 18.9389 64.7264 14.7952 59.3029 11.765C53.8406 8.66099 46.9415 7.18213 38.733 7.18213H4.32956H2.32956V9.18213V111ZM38.5341 60.8753H18.6591V22.1196H38.3352C43.6726 22.1196 47.7417 23.0185 50.6893 24.6529L50.6959 24.6565L50.7026 24.6602C53.7037 26.2944 55.8063 28.5063 57.1034 31.3022L57.1069 31.3099L57.1105 31.3175C58.4908 34.2282 59.2046 37.5746 59.2046 41.398C59.2046 45.2211 58.491 48.5873 57.1071 51.5354L57.1034 51.5436C55.8004 54.3523 53.7009 56.6039 50.7184 58.304C47.8087 59.9625 43.7972 60.8753 38.5341 60.8753Z"
          stroke="white"
          strokeWidth="4"
        />
      </svg>
    </div>
  );
};

export default Home;
